function Error404Page () {
  return (
    <div className="w-full min-h-fit flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
      <h2 className="text-2xl font-semibold">Oups! La page que vous demandés n'existe pas</h2>
    </div>
  )
}

export default Error404Page