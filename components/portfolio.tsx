import React from 'react'

export function Portfolio() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Portfolio</h2>
        <div className="flex overflow-x-auto space-x-4 p-4">
          <img src="https://img.sanishtech.com/u/96d1fb6aa3f8e67ab60d07607ef88a90.jpg" alt="Portfolio Image 1" className="w-64 h-64 object-cover rounded-lg flex-shrink-0" />
          <img src="https://img.sanishtech.com/u/dc6a86f8230fd8be433ce43ed45db51c.jpg" alt="Portfolio Image 2" className="w-64 h-64 object-cover rounded-lg flex-shrink-0" />
          <img src="https://img.sanishtech.com/u/18e36805b4f4c9ac72f975223529b806.png" alt="Portfolio Image 3" className="w-64 h-64 object-cover rounded-lg flex-shrink-0" />
          <img src="https://img.sanishtech.com/u/d31718fe04b17f72dd00f30ef00b4bd8.png" alt="Portfolio Image 4" className="w-64 h-64 object-cover rounded-lg flex-shrink-0" />
          <img src="https://img.sanishtech.com/u/66894febd1318196f3140bf6cedd815c.png" alt="Portfolio Image 5" className="w-64 h-64 object-cover rounded-lg flex-shrink-0" />
        </div>
      </div>
    </section>
  )
}