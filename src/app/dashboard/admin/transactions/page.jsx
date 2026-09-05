import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import {  getTenantBookings } from "@/app/lib/data"; // your function


const TransactionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentRole = session?.user?.type || session?.user?.role;
  if (currentRole !== "admin") {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Access Denied. Admins only.
      </div>
    );
  }

  const transactions = await getTenantBookings();
  // console.log(transactions)
// const transactions = [{
//   transactionId: "txn_123...",
//   propertyName: "Modern Apartment",
//   tenantName: "Rahim",
//   ownerName: "Karim",
//   amount: 45000,
//   date: "2026-09-01",
// //   createdAt: ...
// }]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Transactions
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          All payment transactions on the platform
        </p>
      </div>

      {/* ===================== MOBILE (Cards) ===================== */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {transactions?.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No transactions found.
          </div>
        ) : (
          transactions?.map((tx) => {
            const id = tx.paymentIntentId || tx._id || tx.transactionId;

            return (
              <div
                key={id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm space-y-3"
              >
                {/* Transaction ID */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                    Transaction ID
                  </p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                    {tx.transactionId || id}
                  </p>
                </div>

                {/* Property */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                    Property
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tx.propertyTitle || tx.property?.title || "—"}
                  </p>
                </div>

                {/* Tenant & Owner */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                      Tenant
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {tx.userName || tx.tenant?.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                      Owner
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {tx.ownerName || tx.owner?.name || "—"}
                    </p>
                  </div>
                </div>

                {/* Amount + Date */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                      Amount
                    </p>
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                      ৳{Number(tx.price || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                      Date
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {tx.date || tx.createdAt
                        ? new Date(tx.date || tx.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ===================== DESKTOP (Table) ===================== */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Property Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Tenant Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Owner Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Amount
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions?.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions?.map((tx) => {
                  const id = tx.paymentIntentId || tx._id || tx.transactionId;

                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      {/* Transaction ID */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                          {tx.transactionId || id}
                        </p>
                      </td>

                      {/* Property Name */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {tx.propertyTitle || tx.property?.title || "—"}
                        </p>
                      </td>

                      {/* Tenant Name */}
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {tx.userName || tx.tenant?.name || "—"}
                      </td>

                      {/* Owner Name */}
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {tx.owner || tx.owner?.name || "—"}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        ৳{Number(tx.price || 0).toLocaleString()}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {tx.date || tx.createdAt
                          ? new Date(tx.date || tx.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;