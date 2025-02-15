import React from "react";
import visa from "../../assets/images/visa.png";
import amazon from "../../assets/images/amazon-pay.png";
import paypal from "../../assets/images/paypal.png";
import masterCard from "../../assets/images/card.png";
import appStore from "../../assets/images/app-store.png";
import googlePlay from "../../assets/images/google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-200">
        <div className="container p-10 mt-5">
          <div className="leading-8">
            <h1 className="text-2xl">Get the FreshCart app </h1>
            <p className="text-slate-500">
              we will send you a link ,open it in ypur phone to download the app
            </p>
          </div>
          <div className="flex justify-around gap-3 mt-3 p-4 border-b border-slate-300 md:flex-row flex-col">
            <input
              type="email"
              className="rounded-md w-full md:w-4/5 border border-slate-300 outline-main p-2"
              placeholder="Email.."
            />
            <button className="px-5  md:w-1/5">Share App Link</button>
          </div>
          <div className="flex justify-between px-2 py-6 border-b border-slate-300 md:flex-row flex-col gap-3">
            <div className="flex items-center">
              <p>Payment partners</p>
              <img src={visa} alt="visa" className="w-8 ms-3" />
              <img src={amazon} alt="amazon-pay" className="w-10 ms-3" />
              <img src={paypal} alt="paypal" className="w-8 ms-3" />
              <img src={masterCard} alt="mastercard" className="w-8 ms-3" />
            </div>
            <div className="flex items-center">
              <p>Get deliveries with FreshCart</p>
              <a href="https://play.google.com/store/games?device=windows&pli=1">
                <img src={googlePlay} alt="google-play" className="w-8 ms-3" />
              </a>
              <a href="https://www.apple.com/eg-ar/app-store/">
                <img src={appStore} alt="app-store" className="w-8 ms-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
