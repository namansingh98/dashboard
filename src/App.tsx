import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import {
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

// import dataProvider, {
//   GraphQLClient,
//   liveProvider,
// } from "@refinedev/nestjs-query";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, dataProvider,liveProvider } from "./Providers";



import {Home,ForgotPassword,Login, Register} from "./pages"


const App = () => {
  return (
    <BrowserRouter>
      {/* <ConfigProvider theme={RefineThemes.Blue}> */}
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              // routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              // resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      {/* <Layout> */}
                        <Outlet />
                      {/* </Layout> */}
                    </Authenticated>
                  }
                >

                <Route index element={<Home/>}/>
                  {/* <Route index element={<DashboardPage />} /> */}

                  <Route
                    path="/tasks"
                    element={
                      // <TasksListPage>
                        <Outlet />
                      // </TasksListPage>
                    }
                  >
                    {/* <Route path="new" element={<TasksCreatePage />} /> */}
                    {/* <Route path="edit/:id" element={<TasksEditPage />} /> */}
                  </Route>

                  <Route path="/companies">
                    {/* <Route index element={<CompanyListPage />} /> */}
                    {/* <Route path="new" element={<CompanyCreatePage />} /> */}
                    {/* <Route path="edit/:id" element={<CompanyEditPage />} /> */}
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  {/* <Route path="/login" element={<LoginPage />} /> */}
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      {/* </ConfigProvider> */}
    </BrowserRouter>
  );
};

export default App;