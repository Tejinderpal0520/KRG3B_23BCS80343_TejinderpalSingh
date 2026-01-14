const Header = ({ title }) => {
  return (
    <header
      style={{
        padding: "0.5rem",
        backgroundColor: "#11a0bd",
        color: "#ffffff"
      }}
    >
      <h1>{title}</h1>
    </header>
  )
}

export default Header