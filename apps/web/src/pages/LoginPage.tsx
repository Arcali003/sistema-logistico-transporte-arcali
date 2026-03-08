import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Truck, Mail, Lock, Loader2, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { cn } from '../lib/utils';

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isRegistering) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(isRegistering ? 'Error al crear cuenta' : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 flex items-center justify-center p-6 transition-colors duration-500">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex h-20 w-20 bg-blue-600 rounded-[2.5rem] items-center justify-center shadow-2xl shadow-blue-500/30 animate-bounce-slow">
            <Truck className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Arcali Logistics</h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Sistema de Gestión de Transporte</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <ShieldCheck className="h-6 w-6 text-blue-500 opacity-20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <div className="space-y-6">
              {isRegistering && (
                <div className="group space-y-2">
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-900 dark:text-white transition-all outline-none"
                      placeholder="Juan Pérez"
                    />
                  </div>
                </div>
              )}

              <div className="group space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Correo Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-900 dark:text-white transition-all outline-none"
                    placeholder="usuario@arcali.com"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-900 dark:text-white transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 group",
                isLoading && "opacity-80 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>{isRegistering ? 'Crear Cuenta' : 'Ingresar al Sistema'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline"
            >
              {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
          © 2025 Arcali S.A. • Seguridad de Grado Industrial
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
