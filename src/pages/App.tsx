import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Overview from './Governance'
import { RedirectWithUpdatedGovernance } from './Governance/redirect'
import SideMenu from '../components/Menu/SideMenu'
import TwitterAccountQueryParamReader from '../state/social/TwitterAccountQueryParamReader'
import Web3Status from '../components/Web3Status'
import Delegates from './Delegates'
import Proposals from './Proposals'
import ProposalDetails from '../components/governance/ProposalDetails'

const SiteWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1.5em;
  overflow: auto;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
  `};
`

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 64px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={TwitterAccountQueryParamReader} />
      <SiteWrapper>
        <SideMenu />
        <AppWrapper>
          <URLWarning />
          <ContentWrapper>
            <Web3Status />
            <Popups />
            <Polling />
            <Overview />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/delegates/:protocolID" component={Delegates} />
                <Route exact strict path="/proposals/:protocolID" component={Proposals} />
                <Route exact strict path="/proposals/:protocolID/:proposalID" component={ProposalDetails} />
                <Route path="/" component={RedirectWithUpdatedGovernance} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </ContentWrapper>
        </AppWrapper>
      </SiteWrapper>
    </Suspense>
  )
}
