import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  support: string;
  cta: string;
};

const heroContent: Record<string, HeroContent> = {
  "/a1": {
    eyebrow: "Workshop online e ao vivo para operações de alimentação",
    title: "Uma pessoa sem opção pode mudar o destino",
    highlight: "da mesa inteira.",
    support:
      "Aprenda a desenhar um prato plant-based e sem glúten que dá vontade de pedir, sem transformar sua casa em um restaurante vegano.",
    cta: "Quero participar do workshop"
  },
  "/a2": {
    eyebrow: "Sabor primeiro. Rótulo depois.",
    title: "Ter uma opção vegana no cardápio",
    highlight: "não basta.",
    support:
      "Em 90 minutos, veja como construir uma opção plant-based e sem glúten que começa pelo desejo e conversa com a identidade da sua cozinha.",
    cta: "Quero ver a demonstração ao vivo"
  },
  "/a3": {
    eyebrow: "Comece com um prato piloto",
    title: "Uma nova opção não precisa criar",
    highlight: "uma nova cozinha.",
    support:
      "Veja como testar uma opção plant-based e sem glúten a partir da operação que você já tem, com critérios claros antes de ampliar estoque ou cardápio.",
    cta: "Quero avaliar o encaixe na operação"
  }
};

const problems = [
  "Colocar uma salada, um risoto genérico ou um prato improvisado apenas para dizer que existe alternativa.",
  "Escolher um substituto vegetal pelo rótulo e descobrir depois que sabor e textura não sustentam a recompra.",
  "Comprar um produto tão pré-temperado que ele não conversa com o estilo da casa.",
  "Criar complexidade demais para uma demanda que poderia começar com um único prato piloto bem pensado."
];

const outcomes = [
  "Identificar qual situação do cardápio cria maior risco de veto pelo grupo.",
  "Escolher qual produto XFoods faz mais sentido para o primeiro teste.",
  "Transformar a base em uma receita com identidade própria.",
  "Mapear os cuidados operacionais antes de levar a opção ao cardápio.",
  "Apresentar o prato pelo desejo, sem reduzir a comunicação a uma lista de restrições."
];

const program = [
  {
    number: "01",
    title: "Onde nasce o veto",
    text: "Como grupos com preferências e restrições diferentes escolhem onde comer e por que uma opção fraca pode ser tão ruim quanto nenhuma opção."
  },
  {
    number: "02",
    title: "A prova vem antes da promessa",
    text: "Demonstração ao vivo do Meat* Burguer e do Chicken* Filet XFoods, com foco em aplicação culinária, textura e tempero autoral."
  },
  {
    number: "03",
    title: "Seu prato piloto",
    text: "Você escolhe uma aplicação possível e usa o Sistema Mesa Sem Veto para desenhar a primeira versão do prato."
  },
  {
    number: "04",
    title: "Próximo passo e perguntas",
    text: "Conheça o Kit Experiência para um teste posterior e leve suas dúvidas sobre aplicação, cardápio e adequação à realidade do estabelecimento."
  }
];

const faqs = [
  {
    question: "Eu preciso ter uma cozinha vegana?",
    answer:
      "Não. O workshop foi criado para avaliar como uma opção plant-based pode se encaixar na operação que você já tem. A decisão final depende do fluxo e dos procedimentos da sua cozinha."
  },
  {
    question: "O workshop ensina segurança para celíacos?",
    answer:
      "Não substitui treinamento de segurança alimentar. Os produtos demonstrados são apresentados pela XFoods como sem glúten, mas servir uma pessoa com doença celíaca exige controle de ingredientes e prevenção de contaminação cruzada no estabelecimento."
  },
  {
    question: "Preciso já trabalhar com plant-based?",
    answer:
      "Não. O ponto de partida é entender se existe um prato piloto viável para o seu negócio."
  },
  {
    question: "Vou receber produto ao comprar o workshop?",
    answer:
      "Não. O ingresso dá acesso ao workshop ao vivo. Ao final, a XFoods apresenta separadamente o Kit Experiência para quem quiser testar os produtos na própria cozinha."
  },
  {
    question: "Vou ter que mudar meu cardápio inteiro?",
    answer:
      "Não. A proposta é começar pequeno: um prato piloto, uma aplicação e critérios claros para decidir se vale avançar."
  }
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="M5 12h13M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={`button ${className}`} href="#oferta">
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#inicio" aria-label="XFoods, início da página">
      <img src="/images/xfoods-business-logo.png" width="84" height="84" alt="XFoods" />
      <span>Mesa Sem Veto</span>
    </a>
  );
}

function SalesPage({ hero }: { hero: HeroContent }) {
  const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL?.trim();

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" }
    );
    elements.forEach(element => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container nav-row">
          <Logo />
          <a className="nav-cta" href="#oferta">Ver inscrição</a>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-item">{hero.eyebrow}</p>
              <h1 className="hero-item">
                {hero.title} <span>{hero.highlight}</span>
              </h1>
              <p className="hero-support hero-item">{hero.support}</p>
              <div className="hero-actions hero-item">
                <CtaLink>{hero.cta}</CtaLink>
                <p>Ao vivo, online, 90 minutos</p>
              </div>
              <ul className="hero-facts hero-item" aria-label="Informações do workshop">
                <li><strong>R$ 29,90</strong><span>Ingresso individual</span></li>
                <li><strong>2 produtos</strong><span>Demonstração prática</span></li>
                <li><strong>1 prato</strong><span>Piloto decidido no papel</span></li>
              </ul>
            </div>
            <div className="hero-visual hero-item">
              <div className="image-frame">
                <img
                  src="/images/xfoods-avatar-hero.webp"
                  width="900"
                  height="1350"
                  alt="Personagem fictícia montando um hambúrguer plant-based em uma cozinha profissional"
                  fetchPriority="high"
                />
                <div className="image-tag">
                  <span>Imagem ilustrativa</span>
                  <strong>Cozinha plant-based</strong>
                </div>
              </div>
              <div className="orbit-stamp" aria-hidden="true">
                <span>plant-based</span>
                <i>sem glúten</i>
              </div>
            </div>
          </div>
        </section>

        <section className="decision section-light">
          <div className="container narrow" data-reveal>
            <p className="section-label">Quando a escolha muda</p>
            <h2>Seu cardápio pode ter dezenas de pratos. Uma única ausência ainda pode falar mais alto.</h2>
            <p className="lead">
              A conversa deixa de ser “onde a gente quer comer?” e vira “onde dá para todo mundo?”. O problema aparece quando a única resposta parece improvisada, sem graça ou pouco confiável.
            </p>
            <div className="quote-line">
              <span aria-hidden="true">*</span>
              <p>Você não precisa criar um segundo restaurante. Precisa de uma opção que faça sentido para a operação e pareça comida de verdade para qualquer pessoa da mesa.</p>
            </div>
          </div>
        </section>

        <section className="mistakes section-dark">
          <div className="container split-layout">
            <div className="sticky-copy" data-reveal>
              <p className="section-label section-label-light">O que costuma travar</p>
              <h2>“Ter uma opção” não é o mesmo que ter uma opção desejável.</h2>
              <p>Quando o rótulo vem antes da experiência, o prato pode até entrar no cardápio. O cliente ainda não encontra um motivo para pedir de novo.</p>
              <figure className="food-shot">
                <img src="/images/xfoods-burger.webp" width="1200" height="762" alt="Hambúrguer servido com folhas e tomate" loading="lazy" />
              </figure>
            </div>
            <ol className="problem-list">
              {problems.map((problem, index) => (
                <li data-reveal key={problem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="shift section-acid">
          <div className="container shift-grid" data-reveal>
            <p className="section-label">A mudança de pergunta</p>
            <h2>A inclusão não precisa começar pela restrição. Pode começar pelo desejo.</h2>
            <div className="shift-copy">
              <p>Em vez de perguntar qual prato vegano você é obrigado a ter, pergunte qual prato colocaria no cardápio mesmo se ninguém precisasse chamá-lo de vegano.</p>
              <strong>É essa mudança que organiza o Sistema Mesa Sem Veto.</strong>
            </div>
          </div>
        </section>

        <section className="method section-cream">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-label">Sistema Mesa Sem Veto</p>
              <h2>Provar. Integrar. Ativar.</h2>
              <p>Um caminho em três decisões para sair da ideia genérica e chegar a um prato piloto possível.</p>
            </div>
            <div className="method-grid">
              <article className="method-card" data-reveal>
                <span>01</span>
                <h3>Provar</h3>
                <p>Antes de propósito ou tendência, a experiência sensorial precisa se sustentar. Acompanhe textura, douramento, estrutura e finalização do Meat* Burguer e do Chicken* Filet.</p>
              </article>
              <article className="method-card method-featured" data-reveal>
                <div className="orbit-graphic" aria-hidden="true"><i /><b /></div>
                <span>02</span>
                <h3>Integrar</h3>
                <p>Descubra como a base pode entrar em uma receita que combina com a identidade da casa. Avalie equipamento, montagem, tempero, fluxo e cuidado operacional.</p>
              </article>
              <article className="method-card" data-reveal>
                <span>03</span>
                <h3>Ativar</h3>
                <p>Transforme a ideia em um prato claro, desejável e comunicável, pensado para entrar no cardápio sem uma reforma completa da operação.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="outcomes section-light">
          <div className="container outcomes-grid">
            <div className="outcomes-copy" data-reveal>
              <p className="section-label">Resultado imediato</p>
              <h2>Você termina com um prato piloto decidido no papel.</h2>
              <p className="lead">E com critérios para saber se vale levar esse teste para a sua cozinha.</p>
              <ul className="check-list">
                {outcomes.map(item => (
                  <li key={item}><CheckIcon /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="food-composition" data-reveal>
              <img className="food-main" src="/images/xfoods-chicken.webp" width="900" height="1125" alt="Prato com preparação vegetal grelhada" loading="lazy" />
              <img className="food-secondary" src="/images/xfoods-product-meat.webp" width="900" height="1125" alt="Hambúrguer vegetal servido no pão" loading="lazy" />
              <div className="food-note"><strong>Base neutra</strong><span>Espaço para o tempero da casa</span></div>
            </div>
          </div>
        </section>

        <section className="program section-dark">
          <div className="container">
            <div className="section-heading section-heading-light" data-reveal>
              <p className="section-label section-label-light">O que acontece nos 90 minutos</p>
              <h2>Conteúdo direto para uma decisão real de cardápio.</h2>
            </div>
            <div className="program-list">
              {program.map(item => (
                <article key={item.number} data-reveal>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audience section-cream">
          <div className="container audience-grid">
            <div data-reveal>
              <p className="section-label">Para quem é</p>
              <h2>Para quem precisa tomar uma decisão de cardápio.</h2>
              <ul className="audience-list">
                <li>Donos e gestores de restaurantes que recebem grupos com perfis alimentares diferentes.</li>
                <li>Chefs que querem ampliar repertório sem descaracterizar a cozinha da casa.</li>
                <li>Hamburguerias, lanchonetes, cafés e operações que querem testar uma opção plant-based e sem glúten.</li>
                <li>Negócios que preferem começar com um prato piloto antes de ampliar estoque.</li>
              </ul>
            </div>
            <aside className="not-for" data-reveal>
              <p className="section-label">Não é para</p>
              <ul>
                <li>Quem procura apenas uma certificação ou protocolo completo de segurança para doença celíaca.</li>
                <li>Quem quer transformar todo o cardápio em vegano de uma vez.</li>
                <li>Quem não pretende testar sabor, operação e aceitação antes de decidir uma compra recorrente.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="authority section-light">
          <div className="container authority-grid">
            <figure className="authority-visual" data-reveal>
              <img
                src="/images/xfoods-avatar-kitchen.webp"
                width="1400"
                height="933"
                alt="Personagem fictícia avaliando um prato plant-based em uma cozinha de desenvolvimento"
                loading="lazy"
              />
              <figcaption>Imagem ilustrativa de desenvolvimento culinário plant-based</figcaption>
            </figure>
            <div className="authority-copy" data-reveal>
              <p className="section-label">Quem conduz</p>
              <h2>Uma foodtech luso-brasileira que trata plant-based como comida, não como concessão.</h2>
              <p>Louise Patricio transformou uma frustração pessoal em missão de produto. Quando a opção sem carne e sem glúten de que gostava deixou de existir, ela decidiu investigar por que o mercado ainda entregava tão pouco sabor e versatilidade.</p>
              <p>Foram quase dois anos de trabalho com engenheiros de alimentos, testes e fórmulas descartadas até chegar a bases congeladas que preservam espaço para o tempero e a criação de quem cozinha.</p>
              <div className="authority-stats">
                <div><strong>2 anos</strong><span>de desenvolvimento informado pela marca</span></div>
                <div><strong>22 clientes</strong><span>entre restaurantes e mercados de nicho</span></div>
                <div><strong>90%</strong><span>de recompra recorrente informada pela XFoods</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="offer section-cream" id="oferta">
          <div className="container offer-grid">
            <div className="offer-copy" data-reveal>
              <p className="section-label">Workshop Mesa Sem Veto</p>
              <h2>90 minutos ao vivo para decidir o primeiro prato.</h2>
              <p>Uma experiência prática para começar pequeno, observar o que importa e avaliar o encaixe antes de avançar.</p>
              <ul className="check-list compact">
                <li><CheckIcon /><span>Workshop online e ao vivo</span></li>
                <li><CheckIcon /><span>Demonstração prática dos produtos XFoods</span></li>
                <li><CheckIcon /><span>Construção do prato piloto pelo Sistema Mesa Sem Veto</span></li>
                <li><CheckIcon /><span>Perguntas e respostas ao final</span></li>
              </ul>
            </div>
            <div className="price-card" data-reveal>
              <img src="/images/xfoods-logo.png" width="280" height="360" alt="Símbolo da XFoods com nave espacial" />
              <p>Ingresso individual</p>
              <div className="price"><small>R$</small><strong>29,90</strong></div>
              <span>Pagamento único</span>
              {checkoutUrl ? (
                <a className="button button-wide" href={checkoutUrl}>Quero participar agora <ArrowIcon /></a>
              ) : (
                <button className="button button-wide" type="button" disabled>Checkout em configuração</button>
              )}
              <small>O ingresso não inclui produtos físicos. O Kit Experiência é apresentado separadamente ao final.</small>
            </div>
          </div>
        </section>

        <section className="faq section-light">
          <div className="container faq-grid">
            <div className="faq-heading" data-reveal>
              <p className="section-label">Perguntas frequentes</p>
              <h2>O que faz sentido esclarecer antes de entrar.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} data-reveal open={index === 0}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing section-dark">
          <div className="container closing-inner" data-reveal>
            <p className="section-label section-label-light">Uma decisão de cada vez</p>
            <h2>Não deixe uma opção inexistente ou mal resolvida falar pelo seu cardápio.</h2>
            <p>Se existe espaço para servir uma mesa inteira melhor com uma única decisão, o primeiro passo é descobrir qual decisão faz sentido para a sua operação.</p>
            <CtaLink className="button-light">Quero construir meu prato piloto</CtaLink>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <Logo light />
          <p>Alimentação vegetal com sabor, repertório e propósito.</p>
          <nav aria-label="Redes sociais da XFoods">
            <a href="https://www.instagram.com/xfoods_pt" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/xfoodsvegan" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.tiktok.com/@xfoods" target="_blank" rel="noreferrer">TikTok</a>
            <a href="https://www.linkedin.com/company/x-foods-vegan" target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>XFoods</span>
          <span>Workshop Mesa Sem Veto</span>
        </div>
      </footer>
    </>
  );
}

function ThankYouPage() {
  return (
    <main className="thank-you" id="conteudo">
      <div className="thank-orbit" aria-hidden="true"><i /><b /></div>
      <div className="thank-card">
        <Logo />
        <p className="section-label">Inscrição concluída</p>
        <h1>Seu próximo prato começa com uma decisão bem informada.</h1>
        <p className="thank-lead">Se você chegou aqui após finalizar a compra, sua inscrição no Workshop Mesa Sem Veto foi registrada.</p>
        <div className="next-steps">
          <div><span>01</span><p>Confira o WhatsApp e o e-mail informados no cadastro para localizar a confirmação.</p></div>
          <div><span>02</span><p>O link de acesso ao encontro será enviado pelos canais definidos pela organização.</p></div>
          <div><span>03</span><p>Se ainda não recebeu a mensagem, aguarde o processamento da inscrição e verifique também a pasta de spam.</p></div>
        </div>
        <p className="safe-note">O grupo, a data, o horário e o link da transmissão ainda serão confirmados pela organização.</p>
        <a className="button button-wide" href="/a1">Voltar para a página <ArrowIcon /></a>
      </div>
    </main>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/a1";
  if (path === "/obrigado") return <ThankYouPage />;
  return <SalesPage hero={heroContent[path] ?? heroContent["/a1"]} />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
