import React, { Fragment } from 'react';
import {
  Root,
  Header,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  SidebarTriggerIcon,
  contentBasedLayoutPreset
} from '@mui-treasury/layout';
import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  ContentMockUp,
  FooterMockUp
} from '@mui-treasury/mockup/layout';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Toolbar, CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

const customTheme = createMuiTheme({
  palette: { primary: { main: '#ff5252' } }
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Root config={contentBasedLayoutPreset}>
              {({ headerStyles, sidebarStyles, collapsed }) => (
                <>
                  <CssBaseline />
                  <Header>
                    <Toolbar>
                      <SidebarTrigger className={headerStyles.leftTrigger}>
                        <SidebarTriggerIcon />
                      </SidebarTrigger>
                      <HeaderMockUp />
                    </Toolbar>
                  </Header>
                  <Sidebar>
                    <NavHeaderMockUp collapsed={collapsed} />
                    <div className={sidebarStyles.container}>
                      <NavContentMockUp />
                    </div>
                    <CollapseBtn className={sidebarStyles.collapseBtn}>
                      <CollapseIcon />
                    </CollapseBtn>
                  </Sidebar>
                  <Content>
                    <Container>
                      <Alerts />
                      <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/about" component={About} />
                      </Switch>
                    </Container>

                    {/* <ContentMockUp /> */}
                  </Content>
                  <Footer>
                    <FooterMockUp />
                  </Footer>
                </>
              )}
            </Root>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
