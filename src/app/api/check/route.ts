import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { EMAIL_STATUS, ERRORS, EMAIL_REGEX } from "@/constants/api.constant"
import type { NextRequest } from "next/server";
import type { ApiError, Profile, Response } from "@/lib/api.types";
import type { Database } from "@/lib/database.types";

const formatUUID = (str: string) =>  str.split("-").join("")

const getUser = async (supabase: any, token: string): Promise<Profile> => {
  if (!token || !token.startsWith("Bearer ")) throw ERRORS.profile;
  const id = formatUUID(token.split(" ")[1]);
  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*,plan_id (max_requests)")
      .eq("id", id);

    // se cambia el mensaje de error para no mostrar el uuid
    if (error && error.code === "22P02") throw ERRORS.profile;

    if (!user || user.length === 0) throw ERRORS.profile;
    if (user[0].requests === user[0].plan_id.max_requests)
      throw ERRORS.requests;
    return {
      id: user[0].id,
      plan_id: user[0].plan_id,
      plans: null,
      requests: user[0].requests,
      disposable_requests: user[0].disposable_requests,
      last_payment: user[0].last_payment,
    };
  } catch (error) {
    console.warn(`error inside of getUser(supabase, ${token})`);
    throw error;
  }
};

const updateUserRequest = async (supabase: any, user: Profile, isValid: boolean): Promise<void> => {
  let { requests, disposable_requests } = user;
  requests += 1
  disposable_requests += isValid ? 0 : 1

  try {
    if (requests !== null) {
      const { error } = await supabase
        .from("profiles")
        .update({requests, disposable_requests})
        .eq("id", user.id);
      if (error) throw error;
    }
  } catch (error) {
    console.warn(`error inside of updateUserRequest(supabase, ${user})`);
    throw error;
  }
};

const checkEmail = async (supabase: any, email: string): Promise<Response> => {
  if (!EMAIL_REGEX.test(email)) return EMAIL_STATUS.invalid;
  const domain = email.split("@")[1];

  try {
    const { data: blacklist } = await supabase
      .from("disposable_email_domains")
      .select()
      .eq("name", domain);

    if (blacklist.length > 0) return EMAIL_STATUS.disposable;

    return EMAIL_STATUS.valid;
  } catch (error) {
    console.warn(`error inside of checkEmail(supabase, ${email})`);
    throw error;
  }
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const token = headers().get("authentication") as string
  const requestUrl = new URL(request.url);
  const email = requestUrl.searchParams.get("email")
  try {
    if (!email) throw ERRORS.email
    const user = await getUser(supabase, token);
    const response = await checkEmail(supabase, email);
    await updateUserRequest(supabase, user, response.valid);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const { message, status } = error as ApiError;
    const defaultPublicMessage = "Something has gone wrong";
    if (!status)
      return NextResponse.json({ error: defaultPublicMessage }, { status: 400 });
    return NextResponse.json({ error: message }, { status: status });
  }
}
