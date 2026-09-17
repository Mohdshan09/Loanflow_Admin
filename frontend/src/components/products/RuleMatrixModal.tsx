import { X, Check } from 'lucide-react';
import type { EmploymentType, Product, SalaryType } from '../../types/products.types';

const EMPLOYMENT_TYPES: EmploymentType[] = ['SALARIED', 'SELF_EMPLOYED'];
const SALARY_MODES: SalaryType[] = ['DAT', 'CHEQUE', 'CASH'];

interface RuleMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const RuleMatrixModal = ({ isOpen, onClose, products }: RuleMatrixModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Rule Matrix</h2>
            <p className="text-sm text-slate-500">
              Comparative view of eligibility criteria across all loan products.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-x-auto p-6">
          {products.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No loan products available to show in the matrix.
            </div>
          ) : (
            <table className="w-full min-w-max border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-slate-200 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700 w-48">
                    Criteria
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.id}
                      className="border border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-900"
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Min Age */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Min Age
                  </td>
                  {products.map((p) => (
                    <td
                      key={p.id}
                      className="border border-slate-200 px-4 py-3 text-center text-slate-700"
                    >
                      {p.minAge} years
                    </td>
                  ))}
                </tr>
                {/* Max Age */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Max Age
                  </td>
                  {products.map((p) => (
                    <td
                      key={p.id}
                      className="border border-slate-200 px-4 py-3 text-center text-slate-700"
                    >
                      {p.maxAge} years
                    </td>
                  ))}
                </tr>
                {/* Min Credit Score */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Min Credit Score
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="border border-slate-200 px-4 py-3 text-center">
                      <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {p.minCreditScore}+
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Min Salary */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Min Salary
                  </td>
                  {products.map((p) => (
                    <td
                      key={p.id}
                      className="border border-slate-200 px-4 py-3 text-center font-medium text-emerald-600"
                    >
                      ₹{Number(p.minSalary).toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                {/* Employment Types */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Employment Types
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="border border-slate-200 px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {EMPLOYMENT_TYPES.map((type) => {
                          const isAllowed = p.allowedEmploymentTypes.includes(type);
                          return (
                            <div key={type} className="flex items-center gap-1.5 text-xs">
                              {isAllowed ? (
                                <Check size={14} className="text-emerald-500" />
                              ) : (
                                <X size={14} className="text-slate-300" />
                              )}
                              <span
                                className={
                                  isAllowed ? 'text-slate-700' : 'text-slate-400 line-through'
                                }
                              >
                                {type.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Salary Modes */}
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-600 bg-slate-50/50">
                    Salary Modes
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="border border-slate-200 px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {SALARY_MODES.map((mode) => {
                          const isAllowed = p.allowedSalaryTypes.includes(mode);
                          return (
                            <div key={mode} className="flex items-center gap-1.5 text-xs">
                              {isAllowed ? (
                                <Check size={14} className="text-emerald-500" />
                              ) : (
                                <X size={14} className="text-slate-300" />
                              )}
                              <span
                                className={
                                  isAllowed ? 'text-slate-700' : 'text-slate-400 line-through'
                                }
                              >
                                {mode}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuleMatrixModal;
