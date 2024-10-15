const Header = () => {
    return (
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meu App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/home" className="hover:underline">Home</a></li>
              <li><a href="/register" className="hover:underline">Cadastro</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/recuperacao" className="hover:underline">Recuperação de Senha</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  