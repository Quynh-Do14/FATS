import { Metadata } from "next";
import { configImageURL } from "@/infrastructure/helper/helper";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import IntroductionComponent from "./home/introduction";
import SloganComponent from "./home/slogan";
import FinanceComponent from "./home/finance";
import PricingComponent from "./home/pricing";
import CustomerComponent from "./home/customer";
import PostComponent from "./home/post";
import "@/assets/styles/page/homepage.css"

export const metadata: Metadata = {
  title: 'FATS',
  description: 'Quản lý tài chính thông minh với AI',
  openGraph: {
    type: "website",
    title: 'FATS',
    description: 'Quản lý tài chính thông minh với AI',
    images: [`${configImageURL("thumbnail-fats.png")}`]
  }
}

export default function Home() {
  return (
    <LayoutClient>
      <div className="homepage-container">
        <IntroductionComponent />
        <SloganComponent />
        <FinanceComponent />
        <PricingComponent />
        <CustomerComponent />
        <PostComponent />
      </div>
    </LayoutClient >
  );
}
