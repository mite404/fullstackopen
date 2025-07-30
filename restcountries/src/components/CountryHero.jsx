export function CountryHero({ country }) {
  const flagSvg = country.flags.svg
  const flagPng = country.flags.png
  const flagAlt = country.flags.alt

  return (
      <>
        <h1>{country.name.common}</h1>
        <br/>
        <p></p>
        <p></p>
        <br/>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
              <li key={code}>
                <p>{name}</p>
              </li>
          ))}
        </ul>
        <br/>
        <img  src={flagSvg || flagPng}
              alt={flagAlt}
              width='300px'/>

      </>
  )
}