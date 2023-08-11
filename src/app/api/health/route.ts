import { NextResponse } from "next/server";

export async function GET() {
  const uptimeRobotApi = "https://api.uptimerobot.com/v2/getMonitors";
  const UPTIME_ROBOT_API_KEY = process.env.UPTIME_ROBOT_KEY;
  try {
    const response = await fetch(
      `${uptimeRobotApi}?api_key=${UPTIME_ROBOT_API_KEY}`,
      { method: "post", cache: "no-cache" }
    );
    if (response.status === 429) {
      return NextResponse.json("rate limit exceeded");
    }
    const uptime = await response.json();
    if (uptime.monitors && Array.isArray(uptime.monitors) && uptime.monitors.length > 0) {
      return NextResponse.json(uptime.monitors[0]);
    }
    return NextResponse.json(
      { success: false, message: "Error fetching uptime data" },
      { status: 500 }
    );
  } catch (error) {
    console.error(error);
  }
}
