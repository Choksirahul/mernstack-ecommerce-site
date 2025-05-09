import Header from "./components/header/Header";
import Pages from "./components/main-pages/Pages";

export default function AppLayout() {
  return (
    <section className="main-wrapper">
      <Header />
      <Pages />
    </section>
  );
}
