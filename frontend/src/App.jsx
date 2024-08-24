// src/App.jsx

import React from "react";
import Layout from "./Layout/Layout";

const App = () => {
    return (
        <Layout/>
    );
};

export default App;


// // src/App.jsx

// import './App.css';
// import SalesChart from './components/SalesChart';

// function App() {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Analytics Dashboard</h1>
      
//       {/* Render SalesChart for different periods */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Daily Sales</h2>
//         <SalesChart period="daily" />
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Monthly Sales</h2>
//         <SalesChart period="monthly" />
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Yearly Sales</h2>
//         <SalesChart period="yearly" />
//       </div>
      
//       {/* Uncomment if needed */}
//       {/* <TotalSalesChart /> */}
//     </div>
//   );
// }

// export default App;



// import './App.css'
// import SalesChart from './components/SalesChart'

// // import TotalSalesChart from './components/TotalSalesChart'

// function App() {

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Analytics Dashboard</h1>
//       {/* <SalesChart data={salesData} /> */}
//       <SalesChart period="daily" />
//       <SalesChart period="monthly" />
//       <SalesChart period="yearly" />
//       {/* <TotalSalesChart /> */}
//       {/* Include other charts here */}
//     </div>
//   )
// }

// export default App
