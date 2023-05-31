const Footer = () => {
	const target = "_blank";
	const link ="https://github.com/jairoaw/filmes";

	return (
		<div className="container">
			<p>Curso de ADS - IFRS</p>
			Disciplina de Prática Profissional Integrada I - 1/2023
			<h1>Código fonte: <a href={link} target={target}>Github</a></h1>
			
			
		</div>
	);
};

export default Footer;

