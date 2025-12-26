// Header.jsx ke andar navigation links mein:

<nav className="nav nav--tours">
  <Link to="/tours" className="nav__el">All tours</Link>
  
  {/* 👇 Ye Button Add Karo */}
  <Link to="/ai-planner" className="nav__el flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition">
     ✨ AI Planner
  </Link>
</nav>