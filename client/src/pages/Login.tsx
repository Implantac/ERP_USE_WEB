import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso.',
        });
        setLocation('/');
      } else {
        if (formData.password.length < 6) {
          toast({
            title: 'Senha inválida',
            description: 'A senha deve ter pelo menos 6 caracteres.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        await signUp(formData.email, formData.password, formData.nome);
        toast({
          title: 'Conta criada!',
          description: 'Sua conta foi criada com sucesso. Você já pode fazer login.',
        });
        setIsLogin(true);
        setFormData({ ...formData, password: '' });
      }
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro. Tente novamente.';

      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor, confirme seu email antes de fazer login.';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado.';
      } else if (error.message.includes('Password')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">USE</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isLogin ? 'Entrar no Sistema' : 'Criar Conta'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? 'Digite suas credenciais para acessar o ERP'
              : 'Preencha os dados para criar sua conta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              disabled={loading}
            >
              {isLogin
                ? 'Não tem uma conta? Criar conta'
                : 'Já tem uma conta? Fazer login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
