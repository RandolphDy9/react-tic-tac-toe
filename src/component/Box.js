function Box({ value, onBoxClick }) {
  return (
    <button className="card" onClick={onBoxClick}>
      <div>{ value }</div>
    </button>
  )
}

export default Box;