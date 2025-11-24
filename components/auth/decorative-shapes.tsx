export function DecorativeShapes() {
  return (
    <>
      {/* Decorative shape 1 - Top left */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <div className="w-full h-full bg-linear-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl" />
      </div>

      {/* Decorative shape 2 - Top right */}
      <div className="absolute top-20 right-0 w-96 h-96 opacity-20">
        <div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 right-0 w-48 h-96 opacity-40 pointer-events-none">
        <img src="/images/shape1.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Decorative shape 3 - Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-25">
        <div className="w-full h-full bg-linear-to-br from-indigo-400 to-blue-500 rounded-full blur-3xl" />
      </div>
    </>
  )
}
