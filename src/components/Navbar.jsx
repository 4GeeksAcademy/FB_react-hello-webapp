import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

	return (
		<>
			<nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
				<div className="container mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<Link to="/" className="text-white no-underline hover:text-blue-100 transition-colors">
							<span className="text-xl font-bold flex items-center gap-2">
								📇 Gestor de Contactos
							</span>
						</Link>
						<div className="flex space-x-6">
							<Link to="/" className="text-white hover:text-blue-100 transition-colors font-medium flex items-center gap-1">
								📋 Contactos
							</Link>
							<Link to="/contacts/new" className="text-white hover:text-blue-100 transition-colors font-medium flex items-center gap-1">
								➕ Nuevo Contacto
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;