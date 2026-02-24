"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PinFormProps {
  demoPin?: string;
  onSuccessRedirect: string;
}

export default function PinForm({
  demoPin = "1234",
  onSuccessRedirect,
}: PinFormProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError("");

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const enteredPin = pin.join("");

    if (enteredPin === demoPin) {
      router.push(onSuccessRedirect);
    } else if (enteredPin.length < 4) {
      setError("Please enter your 4-digit PIN");
    } else {
      setError("Invalid PIN. Please try again.");
      setPin(["", "", "", ""]);
      inputs.current[0]?.focus();
    }
  };

  useEffect(() => {
    if (pin.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [pin]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-center gap-4">
        {pin.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`h-16 w-14 rounded-xl border-2 text-center text-3xl font-bold transition-all outline-none ${
              error
                ? "border-red-200 bg-red-50 text-red-600 focus:border-red-400"
                : "focus:border-readly-blue focus:ring-readly-blue/10 border-zinc-200 focus:ring-4"
            }`}
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && (
        <p className="animate-in fade-in slide-in-from-top-2 text-center font-medium text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="bg-readly-blue hover:bg-readly-blue/90 shadow-readly-blue/20 w-full transform rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-[0.98]"
      >
        Continue
      </button>
    </form>
  );
}
