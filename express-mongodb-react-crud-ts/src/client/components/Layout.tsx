import { AppProvider } from '../providers/app-provider';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';
import { ConfirmDialog } from './ConfirmDialog';
import { LocaleMenu } from './LocaleMenu';
import { Sidebar } from './Sidebar';
import { ToggleTheme } from './ToggleTheme';
import clsx from 'clsx';


export default function Layout({ children }: PropsWithChildren) {

    const { show, message, alertType } = useAlertStore();

    const showSidebar = () => {
        document.body.classList.add('showSidebar');
    }

    return (

        <AppProvider>
            <Sidebar />
            <main className="main">
                <nav className="nav">
                    <div className="nav-content">
                        <button className="sidebar-open toggle-menu" onClick={showSidebar}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="logo"><a href="/">TODO</a></div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0.5rem" }}>
                            <LocaleMenu />
                            <ToggleTheme />
                        </div>
                    </div>
                </nav>
                <div className="main-content">
                    <div className="container">
                        <ConfirmDialog />
                        <div className={clsx("alert",
                            alertType === "danger" ? "alert-danger" : "alert-success",
                            show && "show")}>
                            <p>{message}</p>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </main>
        </AppProvider>

    )
}