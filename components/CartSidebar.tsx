"use client"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function CartSidebar() {
  const router = useRouter()
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[201] h-full w-full max-w-[380px] bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h2 className="text-[0.95rem] font-semibold tracking-tight text-gray-900">
              Shopping Bag
              {totalItems > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white text-[0.6rem] font-bold">
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-700"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 pb-20">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Your bag is empty</p>
                <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-semibold text-gray-900 underline underline-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0">
                <div className="w-[78px] h-[90px] rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="text-[0.85rem] font-semibold text-gray-900 leading-snug">{item.name}</p>

                    {/* ── Size + Colour row ── */}
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[0.72rem] text-gray-400 tracking-wide uppercase">
                        Size: {item.size}
                      </p>
                      {item.color && (
                        <>
                          <span className="text-gray-300 text-[0.65rem]">·</span>
                          <div className="flex items-center gap-1">
                            <span
                              style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: item.color,
                                border: "1px solid rgba(0,0,0,0.12)",
                                flexShrink: 0,
                              }}
                            />
                            <p className="text-[0.72rem] text-gray-400 tracking-wide uppercase">
                              Colour
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition text-base"
                      >
                        −
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-[0.8rem] font-semibold text-gray-800 border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition text-base"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <p className="text-[0.88rem] font-bold text-gray-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-[0.68rem] text-gray-400 hover:text-red-500 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 pt-4 pb-24 border-t border-gray-100 bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[0.82rem]">
                <span className="text-gray-500">Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span className="font-semibold text-gray-900">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[0.82rem]">
                <span className="text-gray-500">Shipping</span>
                <span className="text-emerald-600 font-medium text-[0.78rem]">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mb-4" />

            <div className="flex justify-between items-center mb-5">
              <span className="text-[0.88rem] font-semibold text-gray-900">Total</span>
              <span className="text-[1.05rem] font-bold text-gray-900">Rs. {totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={() => { setIsCartOpen(false); router.push("/checkout") }}
              className="w-full bg-gray-900 text-white rounded-xl py-3.5 text-[0.85rem] font-semibold tracking-wide hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            <p className="text-center text-[0.7rem] text-gray-400 mt-3">
              🔒 Secure checkout — COD, Stripe, JazzCash & more
            </p>
          </div>
        )}
      </div>
    </>
  )
}
