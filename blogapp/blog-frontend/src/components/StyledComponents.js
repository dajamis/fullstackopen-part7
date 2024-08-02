import styled from "styled-components"

export const Navigation = styled.div`
  background: #fde4e6;
  padding-left: 1em;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 1em;
`

export const NavUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`

export const Container = styled.div`
  padding: 2em;
`

export const Button = styled.button`
  background: ${({ variant }) =>
    variant === "small"
      ? "#ff66ff"
      : "#ff00ff"}; /* Fuchsia or Lighter Fuchsia */
  color: white;
  font-size: ${({ variant }) => (variant === "small" ? "0.8em" : "1em")};
  margin: 1em;
  padding: ${({ variant }) =>
    variant === "small" ? "0.2em 0.8em" : "0.25em 1em"};
  border: 2px solid
    ${({ variant }) => (variant === "small" ? "#ff66ff" : "#ff00ff")};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: white;
    color: ${({ variant }) => (variant === "small" ? "#ff66ff" : "#ff00ff")};
  }
`

export const Input = styled.input`
  margin: 0.25em;
`
export const Page = styled.div`
  background: #f0f0f0;
  min-height: 100vh;
`

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

export const ListItem = styled.li`
  margin-bottom: 1em;
`

export const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`
