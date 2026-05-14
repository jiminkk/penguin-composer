import { type ReactNode, useState } from "react"
import styled from "styled-components"
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import heroImg from "./assets/hero.png"
import { RecorderComponent } from "./components/Recorder"
import { ClipWaveform } from "./components/ClipWaveform"

const Page = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1126px;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #52525b;
  border-left: 1px solid #e4e4e7;
  border-right: 1px solid #e4e4e7;
`

const CenterSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 32px 20px;

  @media (min-width: 1024px) {
    gap: 24px;
  }
`

const Hero = styled.div`
  position: relative;
`

const HeroBase = styled.img`
  width: 170px;
  position: relative;
  z-index: 0;
`

const HeroReactLogo = styled.img`
  position: absolute;
  inset-inline: 0;
  top: 34px;
  z-index: 10;
  margin: 0 auto;
  height: 28px;
  transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
    scale(1.4);
`

const HeroViteLogo = styled.img`
  position: absolute;
  inset-inline: 0;
  top: 107px;
  z-index: 0;
  margin: 0 auto;
  width: auto;
  height: 26px;
  transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
    scale(0.8);
`

const Title = styled.h1`
  margin: 20px 0;
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #09090b;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    margin: 32px 0;
    font-size: 3.75rem;
  }
`

const TicksDivider = styled.div`
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: #e4e4e7;
  }

  &::after {
    right: 0;
    border-right-color: #e4e4e7;
  }
`

const NextStepsSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-top: 1px solid #e4e4e7;

  @media (min-width: 1024px) {
    flex-direction: row;
    text-align: left;
  }
`

const NextStepColumn = styled.div`
  flex: 1;
  padding: 24px 20px;

  @media (min-width: 1024px) {
    padding: 32px;
  }
`

const DocsColumn = styled(NextStepColumn)`
  border-bottom: 1px solid #e4e4e7;

  @media (min-width: 1024px) {
    border-bottom: 0;
    border-right: 1px solid #e4e4e7;
  }
`

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #09090b;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`

const IconSvg = styled.svg`
  width: 22px;
  height: 22px;
  margin: 0 auto 16px;

  @media (min-width: 1024px) {
    margin-inline: 0;
  }
`

const LinksList = styled.ul`
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  @media (min-width: 1024px) {
    margin-top: 32px;
    justify-content: flex-start;
  }
`

const StyledExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  background: rgba(244, 244, 245, 0.7);
  padding: 6px 12px;
  font-size: 1rem;
  text-decoration: none;
  color: #09090b;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
  }
`

const SocialIcon = styled.svg`
  width: 18px;
  height: 18px;
`

const LinkLogo = styled.img`
  height: 18px;
`

const LinkSquareLogo = styled.img`
  width: 18px;
  height: 18px;
`

const SpacerSection = styled.section`
  height: 48px;
  border-top: 1px solid #e4e4e7;

  @media (min-width: 1024px) {
    height: 88px;
  }
`

type SectionIconProps = {
  iconId: string
}

function SectionIcon({ iconId }: SectionIconProps) {
  return (
    <IconSvg role="presentation" aria-hidden="true">
      <use href={`/icons.svg#${iconId}`}></use>
    </IconSvg>
  )
}

type ExternalLinkProps = {
  href: string
  children: ReactNode
}

function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <StyledExternalLink href={href} target="_blank" rel="noreferrer">
      {children}
    </StyledExternalLink>
  )
}

function App() {
  return (
    <Page>
      <CenterSection>
        <Hero>
          <HeroBase src={heroImg} width="170" height="179" alt="" />
          <HeroReactLogo src={reactLogo} alt="React logo" />
          <HeroViteLogo src={viteLogo} alt="Vite logo" />
        </Hero>
        <div>
          <Title>Penguin Composer</Title>
          <p>Record your voice to get started</p>
        </div>
        <RecorderComponent />
      </CenterSection>

      <TicksDivider></TicksDivider>

      <NextStepsSection>
        <DocsColumn>
          <div>Your recording will show up here once you stop recording!</div>
        </DocsColumn>
      </NextStepsSection>
      <SpacerSection></SpacerSection>
    </Page>
  )
}

export default App
