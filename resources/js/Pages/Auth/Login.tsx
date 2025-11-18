import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Validaciones cliente (estilo proporcionado)
        if (!data.email.trim()) {
            toast.error('Completa el correo electrónico');
            return;
        }
        if (!data.email.includes('@')) {
            toast.error('El correo debe contener @');
            return;
        }
        if (!data.password) {
            toast.error('Completa la contraseña');
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
            onError: (err: any) => {
                // Mostrar errores del servidor si vienen
                if (err.email) toast.error(err.email as string);
                if (err.password) toast.error(err.password as string);
            },
            onSuccess: () => {
                toast.success('Sesión iniciada');
            },
        });
    };

    return (
<<<<<<< HEAD
        <GuestLayout title="Log in">
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
=======
        <GuestLayout noCard>
            <Head title="Iniciar sesión">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
            </Head>

            <div className="crear-cuenta-pagina">
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        :root{ --bg: #ffffff; --card-bg: #ffffff; --muted: #000000ff; --primary: #060357; --input-bg: #f3f6f9; --border: #e6e9ef; }
        body{ background:var(--bg); font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111827; }
        /* Ajustes para posicionar el formulario: dejar espacio para header/logo */
        .crear-cuenta-pagina{ display:flex; min-height:calc(100vh - 160px); align-items:flex-start; }
        .contenedor-centrado{ flex:1 1 auto; display:flex; align-items:center; justify-content:center; padding:40px 12px 24px; }
        .caja-formulario{ width:460px; background:var(--card-bg); border-radius:10px; padding:36px 40px; box-shadow:0 12px 40px rgba(15,23,42,0.12), 0 4px 10px rgba(15,23,42,0.06); border:1px solid rgba(0, 0, 0, 0.03); }
        .titulo-principal{ margin:0 0 18px 0; font-size:28px; text-align:center; font-weight:600 }
        .formulario-registro{ display:flex; flex-direction:column; gap:12px; margin-top:10px }
        .grupo-campo{ display:flex; flex-direction:column; gap:6px }
        .etiqueta{ font-size:13px; color:var(--muted) }
        .campo-texto{ height:40px; padding:8px 12px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); outline:none; transition:box-shadow .12s ease, border-color .12s ease }
        .campo-texto:focus{ box-shadow:0 0 0 4px rgba(6,3,87,0.06); border-color:rgba(6,3,87,0.24) }
        .caja-formulario input:not(:placeholder-shown),
        .caja-formulario .campo-texto:not(:placeholder-shown) {
          background-color: #F3F4F6 !important;
          border-color: #D1D5DB !important;
          box-shadow: inset 0 1px 0 rgba(0,0,0,0.02);
          transition: background-color .12s linear, border-color .12s linear;
        }
        .caja-formulario .campo-texto,
        .caja-formulario input { color: #000000 !important; }
        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #F3F6F9 inset !important;
          box-shadow: 0 0 0px 1000px #F3F6F9 inset !important;
          -webkit-text-fill-color: #000000 !important;
          color: #000000 !important;
        }
        .campo-texto::placeholder { color: #9CA3AF }
        .boton-crear-cuenta{ display:inline-block; width:100%; text-align:center; background:var(--primary); color:#fff; padding:10px 14px; border-radius:8px; border:none; cursor:pointer; font-weight:600 }
  .btn-google{ display:flex; align-items:center; gap:10px; justify-content:center; background:#fff; color:#111827; border-radius:8px; padding:10px 14px; border:1px solid var(--border); cursor:pointer; box-shadow:0 1px 0 rgba(0,0,0,0.02); position:relative; transition:background .12s ease; width:100%; height:40px; font-weight:600 }
  .btn-google:hover{ background:#f0f0f0 }
  .btn-google svg{ width:20px; height:20px; display:block }
        .btn-google[data-tooltip]::after{
          content: attr(data-tooltip);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: calc(100% + 10px);
          background: rgba(15,23,42,0.92);
          color: #fff;
          padding:6px 8px;
          font-size:12px;
          border-radius:6px;
          white-space:nowrap;
          opacity:0;
          pointer-events:none;
          transition:opacity .12s ease, transform .12s ease;
        }
        .btn-google[data-tooltip]:hover::after,
        .btn-google[data-tooltip]:focus::after{ opacity:1; transform: translateX(-50%) translateY(-4px); }
        .separador{ text-align:center; margin:14px 0; font-size:14px; color:var(--muted); font-weight:600 }
        .pie-formulario{ text-align:center; margin-top:12px }
        .texto-pie{ margin:0; text-align:center; color:var(--muted); font-size:13px }
        .enlace-login{ color:var(--primary); text-decoration:none; font-weight:600 }
        @media (max-width:800px){ .caja-formulario{ width:100%; padding:28px; border-radius:8px } }
      `}</style>

                <Toaster
                    toastOptions={{ duration: 4000 }}
                    containerStyle={{
                        position: 'fixed',
                        top: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        width: 'auto',
                        maxWidth: '560px',
                    }}
                />

                {status && (
                    <div style={{ textAlign: 'center', marginBottom: 12 }}>
                        <span style={{ color: '#10B981', fontWeight: 600 }}>{status}</span>
                    </div>
                )}

                <div className="contenedor-centrado">
                    <div className="caja-formulario">
                        <h1 className="titulo-principal">Iniciar sesión</h1>

                        <form className="formulario-registro" onSubmit={submit} noValidate>
                            <div className="grupo-campo">
                                <label htmlFor="email" className="etiqueta">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`campo-texto ${data.email ? 'campo-lleno' : ''}`}
                                    placeholder="Ingresa tu correo electrónico"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>

                            <div className="grupo-campo">
                                <label htmlFor="password" className="etiqueta">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`campo-texto ${data.password ? 'campo-lleno' : ''}`}
                                    placeholder="Ingresa tu contraseña"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>Recordarme</span>
                                </label>

                                {canResetPassword && (
                                    <Link href={route('password.request')} className="enlace-login">¿Olvidaste tu contraseña?</Link>
                                )}
                            </div>

                            <div style={{ marginTop: 12 }}>
                                <button type="submit" className="boton-crear-cuenta" disabled={processing}>Entrar</button>
                            </div>

                            <div className="separador">O</div>

                            <div style={{ marginTop: 12 }}>
                                <button type="button" className="btn-google" data-tooltip="Próximamente" aria-label="Continuar con Google">
                                    <svg viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path fill="#EA4335" d="M23 9.5c3.54 0 6.72 1.27 9.23 3.36l6.9-6.9C35.1 2.6 29.4 0 23 0 14.7 0 7.36 4.75 3.68 11.6l7.99 6.2C13.9 12.1 17.96 9.5 23 9.5z"/>
                                        <path fill="#34A853" d="M45.5 23c0-1.64-.16-3.22-.45-4.73H23v9.02h12.34c-.53 2.88-2.28 5.13-4.86 6.69l7.45 5.78C43.5 35.1 45.5 29.5 45.5 23z"/>
                                        <path fill="#4A90E2" d="M11.67 28.8A13.99 13.99 0 0 1 11.67 17.2L3.68 11.6A23 23 0 0 0 0 23c0 3.56.86 6.92 2.39 9.86l9.28-4.06z"/>
                                        <path fill="#FBBC05" d="M23 46c6.4 0 12.1-2.1 16.54-5.7l-7.45-5.78C29.98 34.4 26.7 35.5 23 35.5c-5.08 0-9.3-3.01-11-7.2l-9.28 4.06C7.36 41.25 14.7 46 23 46z"/>
                                    </svg>
                                    <span>Continuar con Google</span>
                                </button>
                            </div>
                        </form>

                        <div className="pie-formulario">
                            <p className="texto-pie">¿No tienes cuenta? <Link href={route('register')} className="enlace-login">Crea una</Link></p>
                        </div>
                    </div>
>>>>>>> bd02535e5585797822f18d52cc0ce4aa08acae58
                </div>
            </div>
        </GuestLayout>
    );
}
