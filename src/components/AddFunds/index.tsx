"use client";

import { User } from "@supabase/supabase-js";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { Profile as ProfileType } from "@/lib/api.types";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

enum PaymentTypes {
  COINBASE = "coinbase",
  CREDIT_CARD = "credit_card",
}

const paymentAmounts: Array<{
  label: string;
  value: number;
  selected: boolean;
}> = [
  { label: "$1", value: 1, selected: false },
  { label: "$10", value: 10, selected: true },
  { label: "$20", value: 20, selected: false },
  { label: "$50", value: 50, selected: false },
  { label: "$100", value: 100, selected: false },
  { label: "$200", value: 200, selected: false },
  { label: "$500", value: 500, selected: false },
  { label: "$1000", value: 1000, selected: false },
];

export default function AddFunds({
  user,
  profile,
}: {
  user: User;
  profile: ProfileType | null;
}) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(10);
  const [paymentType, setPaymentType] = useState<PaymentTypes>(
    PaymentTypes.COINBASE,
  );
  const [showMessage, setShowMessage] = useState(false);
  const [hostedUrl, setHostedUrl] = useState("#");
  const [showError, setShowError] = useState(false);
  const [showCreatedCharge, setShowCreatedCharge] = useState(false);

  function handlePaymentTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const paymentTypeName = e.target.value;
    if (Object.values(PaymentTypes).includes(paymentTypeName as PaymentTypes)) {
      setPaymentType(paymentTypeName as PaymentTypes);
    }
  }

  function handleAmountChange(e: ChangeEvent<HTMLSelectElement>) {
    const amountNumber = Number(e.target.value);
    setAmount(amountNumber);
  }

  async function handleCreateCharge() {
    setLoading(true);
    setShowError(false);
    setShowCreatedCharge(false);
    try {
      const response = await fetch("/api/coinbase/checkout", {
        method: "post",
        body: JSON.stringify({ user_id: user.id, amount: amount }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setHostedUrl(data.charge.hosted_url);
        setShowMessage(true);
        window.open(data.charge.hosted_url, "_blank", "noopener,noreferrer");
      } else if (response.status === 409) {
        setHostedUrl(data.hosted_url);
        setShowCreatedCharge(true);
      } else {
        setShowError(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar user={user} profile={profile} />
      <main className="mb-32">
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          Agregar fondos
        </h1>
        <div className="flex flex-col md:flex-row px-20 mt-12 justify-center align-middle gap-x-8">
          <div className="flex flex-col gap-y-4 mb-10">
            <div className="flex items-center px-4 border border-gray-200 rounded min-w-[300px]">
              <input
                id="bordered-radio-1"
                type="radio"
                value={PaymentTypes.COINBASE}
                checked={paymentType === PaymentTypes.COINBASE}
                onChange={handlePaymentTypeChange}
                name={PaymentTypes.COINBASE}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
              >
                <div className="flex gap-x-4">
                  <span>Cripto (Coinbase)</span>
                  <Image
                    src="/icons/coinbase.svg"
                    alt="coinbase logo"
                    width={20}
                    height={20}
                  />
                </div>
              </label>
            </div>
            <div className="flex items-center px-4 border border-gray-200 rounded ">
              <input
                id="bordered-radio-2"
                type="radio"
                value={PaymentTypes.CREDIT_CARD}
                checked={paymentType === PaymentTypes.CREDIT_CARD}
                onChange={handlePaymentTypeChange}
                name={PaymentTypes.CREDIT_CARD}
                disabled
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
              >
                <div>
                  <div className="mb-2">Tarjeta de credito o debito</div>
                  <span className="bg-slate-400 p-1 rounded-sm text-white">
                    Proximamente
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div>
            <div className="max-w-md">
              <div className="flex justify-between items-center mb-10">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-900"
                >
                  Cantidad a depositar
                </label>
                <select
                  name="amount"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5"
                  value={amount}
                  onChange={handleAmountChange}
                >
                  {paymentAmounts.map((paymentAmount) => (
                    <option
                      key={paymentAmount.value}
                      value={paymentAmount.value}
                      defaultChecked={paymentAmount.selected}
                    >
                      {paymentAmount.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center mb-10">
                <div className="block text-sm font-medium text-gray-900">
                  Procesado de transacción
                </div>
                <div>$0</div>
              </div>
              <div className="border-b-2 w-full bg-black mb-10"></div>
              <div className="flex justify-between items-center mb-10">
                <div className="block text-sm font-medium text-gray-900">
                  Total a pagar
                </div>
                <div>${amount}</div>
              </div>
              <div className="flex justify-center mb-10">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                  disabled={loading}
                  onClick={handleCreateCharge}
                >
                  Confirmar y pagar ${amount}
                </button>
              </div>
              {showMessage && (
                <div className="bg-green-200 p-4 rounded mb-10 font-bold">
                  Tu intento de pago fue creado exitosamente, si no eres
                  redireccionado, haz click{" "}
                  <a
                    href={hostedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    aqui
                  </a>
                </div>
              )}
              {showError && (
                <div className="bg-red-200 p-4 rounded mb-10 font-bold">
                  Ha ocurrido un error, intenta mas tarde.
                </div>
              )}
              {showCreatedCharge && (
                <div className="bg-red-200 p-4 rounded mb-10 font-bold">
                  Posees una transaccion abierta, haz click{" "}
                  <a
                    href={hostedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    aqui
                  </a>{" "}
                  para procesarla
                </div>
              )}
              <ul className="list-disc text-sm ">
                <li className="font-bold mb-2">
                  Al hacer click, aceptas que este deposito no es reembolsable!
                </li>
                <li>
                  Normalmente el pago sera confirmado en pocos minutos, pero
                  puede demorar hasta 3 horas.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
