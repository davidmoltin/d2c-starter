import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Announcement from "../../components/builder/Announcement";
import Home from "../../components/builder/Home";

import type { ReactNode } from "react";
import type { NavigationNode } from "../../lib/build-site-navigation";

interface IMainLayout {
  nav: NavigationNode[];
  children: ReactNode;
}

const MainLayout = ({ nav, children }: IMainLayout): JSX.Element => {
  return (
    <>
      <Announcement announce={undefined} />
      <Header nav={nav} />
      <Home Home={undefined} /> 
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
