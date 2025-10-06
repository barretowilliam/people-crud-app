import React, { useEffect, useState } from "react";
import { getPeople, createPerson, updatePerson, deletePerson } from "./PeopleService";
import "./App.css";

function onlyLettersAndSpaces(str) {
  return str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, " ").replace(/\s{2,}/g, " ").trim();
}
function capitalizeWords(str) {
  const clean = onlyLettersAndSpaces(str.toLowerCase());
  if (!clean) return "";
  return clean
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
function formatCpf(digitsOnly) {
  const d = digitsOnly.replace(/\D/g, "").slice(0, 11);
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 9);
  const p4 = d.slice(9, 11);
  let out = p1;
  if (p2) out += "." + p2;
  if (p3) out += "." + p3;
  if (p4) out += "-" + p4;
  return out;
}
function has11CpfDigits(maskedCpf) {
  return maskedCpf.replace(/\D/g, "").length === 11;
}

function App() {
  const [people, setPeople] = useState([]);

  const [form, setForm] = useState({
    id: undefined,
    nome: "",
    idade: "",
    estadoCivil: "",
    cpf: "",
    cidade: "",
    estado: ""
  });

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    loadPeople();
    loadEstados();
  }, []);

  async function loadPeople() {
    const response = await getPeople();
    setPeople(response.data || []);
    setCurrentPage(1);
  }

  async function loadEstados() {
    const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const data = await res.json();
    const sorted = data
      .map((e) => ({ sigla: e.sigla, nome: e.nome }))
      .sort((a, b) => a.sigla.localeCompare(b.sigla));
    setEstados(sorted);
  }

  async function loadCidades(uf) {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const data = await res.json();
    const sorted = data.map((c) => c.nome).sort((a, b) => a.localeCompare(b, "pt-BR"));
    setCidades(sorted);
  }

  function handleNomeChange(e) {
    setForm((f) => ({ ...f, nome: capitalizeWords(e.target.value) }));
  }
  function handleIdadeChange(e) {
    const n = parseInt(e.target.value, 10);
    setForm((f) => ({ ...f, idade: !Number.isNaN(n) && n > 0 ? String(n) : "" }));
  }
  function handleCpfChange(e) {
    setForm((f) => ({ ...f, cpf: formatCpf(e.target.value) }));
  }
  function handleEstadoCivilChange(e) {
    setForm((f) => ({ ...f, estadoCivil: e.target.value }));
  }
  function handleEstadoChange(e) {
    const uf = e.target.value;
    setForm((f) => ({ ...f, estado: uf, cidade: "" }));
    if (uf) loadCidades(uf);
    else setCidades([]);
  }
  function handleCidadeChange(e) {
    setForm((f) => ({ ...f, cidade: capitalizeWords(e.target.value) }));
  }

  function validateForm() {
    if (!form.nome || !form.idade || !form.estadoCivil || !form.cpf || !form.cidade || !form.estado) {
      alert("Todos os campos são obrigatórios.");
      return false;
    }
    if (parseInt(form.idade, 10) < 1) {
      alert("Idade deve ser maior que 0.");
      return false;
    }
    if (!has11CpfDigits(form.cpf)) {
      alert("CPF deve conter 11 dígitos.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...form,
      nome: capitalizeWords(form.nome),
      idade: parseInt(form.idade, 10),
      cpf: form.cpf.replace(/\D/g, "")
    };

    if (form.id) {
      await updatePerson(form.id, payload);
    } else {
      await createPerson(payload);
    }

    setForm({
      id: undefined,
      nome: "",
      idade: "",
      estadoCivil: "",
      cpf: "",
      cidade: "",
      estado: ""
    });
    setCidades([]);
    loadPeople();
  }

  function handleEdit(person) {
    setForm({
      id: person.id,
      nome: capitalizeWords(person.nome || ""),
      idade: String(person.idade || ""),
      estadoCivil: person.estadoCivil || "",
      cpf: formatCpf((person.cpf || "").replace(/\D/g, "")),
      cidade: capitalizeWords(person.cidade || ""),
      estado: (person.estado || "").toUpperCase().slice(0, 2)
    });
    if (person.estado) loadCidades(person.estado);
  }

  async function handleDelete(id) {
    await deletePerson(id);
    loadPeople();
  }

  function handleSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  function getSortedData(data) {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = (a[sortConfig.key] || "").toString().toLowerCase();
      const valB = (b[sortConfig.key] || "").toString().toLowerCase();
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const filtered = people.filter((p) =>
    capitalizeWords(p.nome).toLowerCase().includes(search.toLowerCase())
  );
  const sorted = getSortedData(filtered);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <header className="header">
        <img className="logo" src="/hexagon-logo.svg" alt="Hexagon" />
        <span>Hexagon — CRUD de Pessoas</span>
      </header>

      <div className="App">
        <h1>Gerenciamento de Pessoas</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={form.nome} onChange={handleNomeChange} required />
          <input type="number" placeholder="Idade" value={form.idade} onChange={handleIdadeChange} min={1} required />
          <select value={form.estadoCivil} onChange={handleEstadoCivilChange} required>
            <option value="">Selecione o Estado Civil</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viúvo">Viúvo</option>
          </select>
          <input type="text" placeholder="CPF (000.000.000-00)" value={form.cpf} onChange={handleCpfChange} required />
          <select value={form.estado} onChange={handleEstadoChange} required>
            <option value="">Selecione o Estado</option>
            {estados.map((e) => (
              <option key={e.sigla} value={e.sigla}>
                {e.sigla} - {e.nome}
              </option>
            ))}
          </select>
          <select value={form.cidade} onChange={handleCidadeChange} required disabled={!form.estado}>
            <option value="">Selecione a Cidade</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button type="submit">{form.id ? "Atualizar" : "Cadastrar"}</button>
        </form>

        <hr />

        {people.length === 0 ? (
          <p>Nenhum registro cadastrado.</p>
        ) : (
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="sort-header">
              <button onClick={() => handleSort("nome")} className={sortConfig.key === "nome" ? "active" : ""}>
                Nome {sortConfig.key === "nome" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </button>
              <button onClick={() => handleSort("idade")} className={sortConfig.key === "idade" ? "active" : ""}>
                Idade {sortConfig.key === "idade" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </button>
              <button onClick={() => handleSort("estadoCivil")} className={sortConfig.key === "estadoCivil" ? "active" : ""}>
                Estado Civil {sortConfig.key === "estadoCivil" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </button>
              <button onClick={() => handleSort("cidade")} className={sortConfig.key === "cidade" ? "active" : ""}>
                Cidade {sortConfig.key === "cidade" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </button>
              <button onClick={() => handleSort("estado")} className={sortConfig.key === "estado" ? "active" : ""}>
                Estado {sortConfig.key === "estado" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </button>
            </div>

            <ul>
              {currentItems.map((p) => (
                <li key={p.id}>
                  {capitalizeWords(p.nome)} — {p.idade} anos — {p.estadoCivil} — {formatCpf(String(p.cpf))} —{" "}
                  {capitalizeWords(p.cidade)}/{String(p.estado).toUpperCase()}
                  <div>
                    <button onClick={() => handleEdit(p)}>Editar</button>
                    <button onClick={() => handleDelete(p.id)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pagination">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
