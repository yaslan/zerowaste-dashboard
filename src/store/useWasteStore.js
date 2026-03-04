import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

const generateId = () => 'ZW-' + crypto.randomUUID().slice(0, 8).toUpperCase();

// Helper function for local time
const currentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const INITIAL_BATCHES = [
    {
        id: 'ZW-1042', source: 'GreenCity Muni', type: 'PLASTIC', weight: 1200, time: '10:30 AM', status: 'PENDING',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwmvUDssXU1OftR7lp9aDKH1IRAxSggUOqRMFkBZzp_MtbJK6S_7L4_yP4LasVNvcTrLKGRIYYvX3DWsyXb3O-TgpjmJf6DgBeoIlfAEcLYHoSVVFPaxV88UqAwCC9YCpPkKL_IkTJiy3fZIVqxMJssLBUZbGZYO0CkN6idtatmr5h3Aq3ofJGhav9ma66-tX_rJmmukhqU5RmXGItMEiVA3DXcq4bwRhtkI0XUjpOVZLksXQ852mI_wd4zktfwloWfpDGkYGYmZE'
    },
    {
        id: 'ZW-1041', source: 'EcoCorp Industrial', type: 'METAL', weight: 3500, time: '09:15 AM', status: 'Processing',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQLoS4ksadUOEl_PUlIvHJ1sL-seM4tOx8IfDk__zLB6h9Io2YP51ugEacUFcs-tZ-CyLIly0XzK0y_WUKqWk6GvrAamVYHjzaMcD162yVxKHfuov5ZdIS_ZUitHvkzmuV2X5jKAGXeiblGZ_xKo1N9wxF4dqAsZ8sr2wInOKmPz6N-9s2-F_672uU2NyjYKWSz1sUrGHTnxKS5AR9-kcERLIrjNZwbStLGezT3XAYHxK9mXAo0m3FgA06Nnf0t38byS9eDjV628Q'
    },
    {
        id: 'ZW-1040', source: 'BioClean Solutions', type: 'Organic', weight: 850, time: '08:45 AM', status: 'Verified',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQLoS4ksadUOEl_PUlIvHJ1sL-seM4tOx8IfDk__zLB6h9Io2YP51ugEacUFcs-tZ-CyLIly0XzK0y_WUKqWk6GvrAamVYHjzaMcD162yVxKHfuov5ZdIS_ZUitHvkzmuV2X5jKAGXeiblGZ_xKo1N9wxF4dqAsZ8sr2wInOKmPz6N-9s2-F_672uU2NyjYKWSz1sUrGHTnxKS5AR9-kcERLIrjNZwbStLGezT3XAYHxK9mXAo0m3FgA06Nnf0t38byS9eDjV628Q'
    },
    {
        id: 'ZW-1039', source: 'Urban Renew', type: 'Glass', weight: 2100, time: '07:30 AM', status: 'Verified',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwmvUDssXU1OftR7lp9aDKH1IRAxSggUOqRMFkBZzp_MtbJK6S_7L4_yP4LasVNvcTrLKGRIYYvX3DWsyXb3O-TgpjmJf6DgBeoIlfAEcLYHoSVVFPaxV88UqAwCC9YCpPkKL_IkTJiy3fZIVqxMJssLBUZbGZYO0CkN6idtatmr5h3Aq3ofJGhav9ma66-tX_rJmmukhqU5RmXGItMEiVA3DXcq4bwRhtkI0XUjpOVZLksXQ852mI_wd4zktfwloWfpDGkYGYmZE'
    }
];

const INITIAL_TRANSACTIONS = [
    { id: 'T-1', title: 'Paper Recycling Milestone', type: 'earn', amount: 50, time: '2 days ago' },
    { id: 'T-2', title: 'Organic Waste Deposit', type: 'earn', amount: 5, time: 'Yesterday' },
    { id: 'T-3', title: 'Plastic & Glass Pickup', type: 'earn', amount: 12, time: '10:24 AM' }
];

const useWasteStore = create(
    persist(
        (set, get) => ({
            // Initial global state
            totalRecycledTons: 1284,
            ecoTokens: 450200,
            carbonOffset: 840,
            userBalance: 1240.00,
            batches: INITIAL_BATCHES,
            transactions: INITIAL_TRANSACTIONS,

            // Reset store to initial state (useful for testing)
            resetStore: () => set({
                totalRecycledTons: 1284,
                ecoTokens: 450200,
                carbonOffset: 840,
                userBalance: 1240.00,
                batches: INITIAL_BATCHES,
                transactions: INITIAL_TRANSACTIONS,
            }),

            // Supabase Loaders (Will populate via database when configured)
            fetchInitialData: async () => {
                if (!supabase) return;
                try {
                    const { data: batchesData, error: batchError } = await supabase
                        .from('batches')
                        .select('*')
                        .order('created_at', { ascending: false });
                    if (!batchError && batchesData && batchesData.length > 0) {
                        set({ batches: batchesData });
                    }
                } catch (e) {
                    console.warn('Supabase not fully setup yet:', e.message);
                }
            },

            // Actions
            logCollection: async (weight, source, type = 'MIXED') => {
                const weightNum = parseFloat(weight);
                if (isNaN(weightNum) || weightNum <= 0) return; // ← guard eklendi

                const newBatch = {
                    id: generateId(),
                    source,
                    type,
                    weight: weightNum,
                    time: currentTime(),
                    status: 'PENDING',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQLoS4ksadUOEl_PUlIvHJ1sL-seM4tOx8IfDk__zLB6h9Io2YP51ugEacUFcs-tZ-CyLIly0XzK0y_WUKqWk6GvrAamVYHjzaMcD162yVxKHfuov5ZdIS_ZUitHvkzmuV2X5jKAGXeiblGZ_xKo1N9wxF4dqAsZ8sr2wInOKmPz6N-9s2-F_672uU2NyjYKWSz1sUrGHTnxKS5AR9-kcERLIrjNZwbStLGezT3XAYHxK9mXAo0m3FgA06Nnf0t38byS9eDjV628Q'
                };

                const weightTons = weightNum / 1000;
                const tokensEarned = Math.floor(weightNum);

                // Optional Supabase DB Sync
                if (supabase) {
                    try { await supabase.from('batches').insert([newBatch]); } catch (e) { console.warn('Supabase insert error:', e.message); }
                }

                set((state) => {
                    let newTransactions = state.transactions;
                    if (tokensEarned > 0) {
                        const txTitle = source === 'Citizen App'
                            ? `Smart Bin: ${type} Deposit`
                            : `Collector Log: ${type} (${source})`;
                        newTransactions = [
                            {
                                id: 'T-' + crypto.randomUUID().slice(0, 8),
                                title: txTitle,
                                type: 'earn',
                                amount: tokensEarned,
                                time: currentTime()
                            },
                            ...state.transactions
                        ];
                    }

                    return {
                        batches: [newBatch, ...state.batches],
                        transactions: newTransactions,
                        totalRecycledTons: +(state.totalRecycledTons + weightTons).toFixed(2),
                        ecoTokens: state.ecoTokens + tokensEarned,
                        userBalance: source === 'Citizen App' ? state.userBalance + tokensEarned : state.userBalance,
                    };
                });
            },

            processPending: async () => {
                const { batches } = get();

                if (supabase) {
                    const pendingIds = batches.filter(b => b.status === 'PENDING').map(b => b.id);
                    try {
                        await supabase.from('batches').update({ status: 'Processing' }).in('id', pendingIds);
                    } catch (e) { console.warn('Supabase update error:', e.message); }
                }

                set((state) => ({
                    batches: state.batches.map(b => b.status === 'PENDING' ? { ...b, status: 'Processing' } : b)
                }));
            },

            verifyAndSort: async (id) => {
                if (supabase) {
                    try { await supabase.from('batches').update({ status: 'Verified' }).eq('id', id); } catch (e) { console.warn('Supabase update error:', e.message); }
                }

                set((state) => ({
                    batches: state.batches.map(b => b.id === id ? { ...b, status: 'Verified' } : b),
                    carbonOffset: state.carbonOffset + 5,
                }));
            },

            redeemTokens: async (amount) => {
                const state = get();
                if (state.userBalance >= amount) {
                    const redemptionTx = {
                        id: 'T-' + crypto.randomUUID().slice(0, 8),
                        title: 'Marketplace Redemption',
                        type: 'spend',
                        amount,
                        time: currentTime(),
                    };
                    set({
                        userBalance: state.userBalance - amount,
                        transactions: [redemptionTx, ...state.transactions],
                    });
                }
            }
        }),
        {
            name: 'zerowaste-store', // localStorage key
            // Only persist core user/batch data, not functions
            partialize: (state) => ({
                totalRecycledTons: state.totalRecycledTons,
                ecoTokens: state.ecoTokens,
                carbonOffset: state.carbonOffset,
                userBalance: state.userBalance,
                batches: state.batches,
                transactions: state.transactions,
            }),
        }
    )
);

export default useWasteStore;
