import { faqs } from "@/app/lib/static-data";
import FAQItem from "@/app/ui/faq-item";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Faqs",
};
export default function Faqs() {
  return (
    <main className=" p-6">
      <h1 className="text-primary text-[40px] font-bold text-center">
        Frequently Asked Questions (FAQ)
      </h1>
      <p className="font-medium leading-5 text-slate-400 text-center mt-1">
        Find quick answers to common questions about our policies, claims,
        account management, and more. If you don’t see what you’re looking for,
        our support team is here to help.
      </p>

      <div className=" my-14">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${
              index === faqs?.length - 1 ? "" : "border-b border-gray-300"
            } py-6`}
          >
            <FAQItem question={faq.question} answer={faq.answer} />
          </div>
        ))}
      </div>
    </main>
  );
}
