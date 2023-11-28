export default function Search({ search }) {
  return (
    <div className="d-flex align-items-center">
      <h1 className="me-2 fs-3 me-4" style={{ color: "red" }}>
        Yutub
      </h1>
      <div className="form mt-2 mb-4 w-100">
        <form onSubmit={search} method="get">
          <input
            className="form-control form-control-lg bg-dark"
            name="query"
            type="text"
            placeholder="🔎Search photos..."
            aria-label=".form-control-lg example"
          ></input>
        </form>
      </div>
    </div>
  );
}
