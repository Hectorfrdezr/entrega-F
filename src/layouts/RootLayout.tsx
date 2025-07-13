import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/home/Banner";
import { NewLetter } from "../components/home/NewLetter";
import { Sheet } from "../components/shared/Sheet";
import { useGlobalStore } from "../store/Global.store";
import { NavbarMobile} from "../components/shared/NavbarMobile";

export const RootLayout = () => {

    const {pathname} = useLocation();

    const isSheetopen = useGlobalStore(state => state.isSheetOpen);

    const actiNavMobile = useGlobalStore(state => state.activeNavMobile);
  return (

    <div className="h-screen flex flex-col font-montserrat">
        <Navbar/>
        {pathname === '/' && <Banner/>}

      <main className="container m-auto p-4 my-8 flex-1">
        <Outlet/>
      </main>

          {pathname === '/' && <NewLetter/>}

          {isSheetopen && <Sheet/>}

          {actiNavMobile && <NavbarMobile/>}

        <Footer/>
    </div>
  );
};
