import { Outlet } from 'react-router-dom';
import { AppProvider } from '../providers/app-provider';
import { AlertMessageContainer } from './AlertMessageContainer';
import { ConfirmDialog } from './ConfirmDialog';
import { LocaleMenu } from './LocaleMenu';
import { Sidebar } from './Sidebar';
import { ToggleTheme } from './ToggleTheme';


export default function Layout() {

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
                        <AlertMessageContainer />
                        <Outlet />
                    </div>
                </div>
            </main>
        </AppProvider>

    )
}