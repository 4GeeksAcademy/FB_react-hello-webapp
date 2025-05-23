import React from "react";

const Footer = () => {
	return (
		<>
			<footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-6 text-center mt-auto">
				<p className="text-gray-600">
					© {new Date().getFullYear()} Gestor de Contactos - Todos los derechos reservados
				</p>
			</footer>
		</>
	);
};

export default Footer;