import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import useWasteStore from '../store/useWasteStore';

export default function Login() {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const login = useWasteStore(state => state.login);
    const register = useWasteStore(state => state.register);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error(t('login.fillFieldsMsg'));
            return;
        }

        if (password.length < 6) {
            toast.error(t('login.passMinLengthMsg'));
            return;
        }

        setLoading(true);

        let successObj;
        if (isLogin) {
            successObj = await login(email, password);
        } else {
            successObj = await register(email, password);
        }

        setLoading(false);

        const { success, error } = successObj;

        if (success) {
            toast.success(isLogin ? t('login.successLoginMsg') : t('login.successRegMsg'));
            navigate('/municipality-dashboard');
        } else {
            toast.error(error || (isLogin ? t('login.failLoginMsg') : t('login.failRegMsg')));
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-8 text-slate-800 dark:text-slate-100 font-display relative">

            {/* Simple language switcher inside login just in case they land here directly */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={() => {
                        const { i18n } = require('i18next');
                        const newLang = i18n.language === 'tr' ? 'en' : 'tr';
                        i18n.changeLanguage(newLang);
                    }}
                    className="bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-slate-200 dark:border-border-dark backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all font-medium text-slate-700 dark:text-slate-200 shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">language</span>
                    TR/EN
                </button>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-primary size-12 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white">shield_person</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        {isLogin ? t('login.adminAccess') : t('login.createAccount')}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {isLogin ? t('login.signInToBoard') : t('login.signUpToManage')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('login.emailLabel')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-border-dark rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                            placeholder={t('login.emailPlaceholder')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('login.passwordLabel')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-border-dark rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                            placeholder={t('login.passwordPlaceholder')}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                    >
                        {loading ? (
                            <span className="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></span>
                        ) : (
                            <>
                                <span>{isLogin ? t('login.signIn') : t('login.signUp')}</span>
                                <span className="material-symbols-outlined text-sm">
                                    {isLogin ? 'login' : 'person_add'}
                                </span>
                            </>
                        )}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {isLogin ? t('login.dontHaveAccount') : t('login.alreadyHaveAccount')}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-primary dark:text-primary-light font-bold hover:underline"
                            >
                                {isLogin ? t('login.signUp') : t('login.signIn')}
                            </button>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-primary/5 text-slate-600 dark:text-slate-400 font-medium py-3 px-4 rounded-lg transition-all"
                    >
                        {t('login.backToHome')}
                    </button>
                </form>
            </div>
        </div>
    );
}
