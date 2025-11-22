"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./calificar.css";

type Faculty = {
  id: string;
  name: string;
};

type Subject = {
  id: string;
  name: string;
};

type Professor = {
  id: string;
  fullName: string;
  photoUrl?: string | null;
};

type HasRatedResponse = {
  hasRated: boolean;
};

const API_BASE_URL = "http://localhost:3000/api"; // 🔁 AJUSTA A TU BACKEND

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, disabled }) => (
  <div className="rp-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`rp-star ${star <= value ? "rp-star--filled" : ""}`}
        onClick={() => !disabled && onChange(star)}
        disabled={disabled}
      >
        ★
      </button>
    ))}
  </div>
);

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error en la petición: ${res.status}`);
  return (await res.json()) as T;
};

export default function CalificarPage() {
  // 🔐 TODO: obtener de tu sistema de auth
  const studentId = "STUDENT_ID_DEMO";

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");

  const [step, setStep] = useState<1 | 2>(1);

  const [generalRating, setGeneralRating] = useState(0);
  const [teachingQuality, setTeachingQuality] = useState("");
  const [gradingStyle, setGradingStyle] = useState("");
  const [specialQuality, setSpecialQuality] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingRated, setCheckingRated] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // nuevo: modal y estado de finalización
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const teachingOptions = ["Excelente", "Buena", "Regular", "Deficiente"];
  const gradingOptions = ["Exigente pero justo", "Promedio", "Muy laxo"];
  const specialOptions = [
    "Explica claro",
    "Acompaña al estudiante",
    "Maneja bien el tiempo",
    "Da buenos ejemplos",
    "Otra cualidad",
  ];

  // Facultades
  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await fetchJson<Faculty[]>(`${API_BASE_URL}/faculties`);
        setFaculties(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las facultades.");
      }
    };
    loadFaculties();
  }, []);

  // Materias según facultad
  useEffect(() => {
    if (!selectedFaculty) {
      setSubjects([]);
      setSelectedSubject("");
      return;
    }
    const loadSubjects = async () => {
      try {
        const data = await fetchJson<Subject[]>(
          `${API_BASE_URL}/subjects?facultyId=${selectedFaculty}`
        );
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las materias.");
      }
    };
    loadSubjects();
  }, [selectedFaculty]);

  // Profesores según materia
  useEffect(() => {
    if (!selectedSubject) {
      setProfessors([]);
      setSelectedProfessor("");
      return;
    }
    const loadProfessors = async () => {
      try {
        const data = await fetchJson<Professor[]>(
          `${API_BASE_URL}/professors?subjectId=${selectedSubject}`
        );
        setProfessors(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los profesores.");
      }
    };
    loadProfessors();
  }, [selectedSubject]);

  // Verificar si ya calificó a ese profesor
  useEffect(() => {
    if (!selectedProfessor || !studentId) {
      setHasRated(false);
      return;
    }
    const checkIfRated = async () => {
      setCheckingRated(true);
      setError("");
      try {
        const data = await fetchJson<HasRatedResponse>(
          `${API_BASE_URL}/calificaciones/has-rated?studentId=${studentId}&profesorId=${selectedProfessor}`
        );
        setHasRated(data.hasRated);
      } catch (err) {
        console.error(err);
        setError("No se pudo verificar si ya calificaste a este profesor.");
      } finally {
        setCheckingRated(false);
      }
    };
    checkIfRated();
  }, [selectedProfessor, studentId]);

  const handleAccept = () => {
    setError("");
    setSuccess("");
    setIsFinished(false);

    if (!selectedFaculty || !selectedSubject || !selectedProfessor) {
      setError("Completa facultad, materia y profesor antes de continuar.");
      return;
    }
    if (hasRated) {
      setError("Ya calificaste a este profesor. No puedes volver a hacerlo.");
      return;
    }
    setStep(2);
  };

  // validación antes de mostrar el modal
  const canSend = () => {
    if (!generalRating || !teachingQuality || !gradingStyle || !specialQuality) {
      setError("Completa todas las puntuaciones antes de enviar.");
      return false;
    }
    return true;
  };

  // submit del formulario → solo abre el modal
  const handleOpenConfirm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!canSend()) return;

    setShowConfirm(true);
  };

  // confirmación en el modal → hace el POST
  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/calificaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(studentId),
          profesorId: Number(selectedProfessor),
          materiaId: Number(selectedSubject),
          // si agregas facultad en el backend, mándala aquí
          estrellas: generalRating,
          comoEnsenia: teachingQuality,
          comoCalifica: gradingStyle,
          cualidadEspecial: specialQuality,
        }),
      });

      if (res.status === 409) {
        setHasRated(true);
        setError("Ya habías calificado a este profesor anteriormente.");
        return;
      }

      if (!res.ok) {
        let message = "Error al guardar la calificación.";
        try {
          const json = (await res.json()) as { message?: string };
          if (json.message) message = json.message;
        } catch {
          /* ignore */
        }
        throw new Error(message);
      }

      setSuccess("¡Gracias! Tu calificación se ha guardado correctamente.");
      setHasRated(true);
      setIsFinished(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedProfessorObj = professors.find(
    (p) => String(p.id) === String(selectedProfessor)
  );

  const isAcceptDisabled =
    !selectedFaculty ||
    !selectedSubject ||
    !selectedProfessor ||
    hasRated ||
    checkingRated;

  const isSubmitDisabled =
    loading ||
    !generalRating ||
    !teachingQuality ||
    !gradingStyle ||
    !specialQuality ||
    isFinished;

  return (
    <div className="rp-page">
      {/* Card superior */}
      <div className="rp-card">
        <div className="rp-card-header">Califica a tus profesores</div>

        <div
          className={`rp-card-body ${
            step === 2 ? "rp-card-body--disabled" : ""
          }`}
        >
          <div className="rp-field">
            <label>
              Facultad: <span className="rp-required">*</span>
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(e.target.value);
                setSelectedSubject("");
                setSelectedProfessor("");
                setStep(1);
                setIsFinished(false);
              }}
              disabled={step === 2}
            >
              <option value="">Ingrese la facultad</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rp-field">
            <label>
              Materia: <span className="rp-required">*</span>
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedProfessor("");
                setStep(1);
                setIsFinished(false);
              }}
              disabled={step === 2 || !selectedFaculty}
            >
              <option value="">Ingrese la materia</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rp-field">
            <label>
              Profesor: <span className="rp-required">*</span>
            </label>
            <select
              value={selectedProfessor}
              onChange={(e) => {
                setSelectedProfessor(e.target.value);
                setStep(1);
                setIsFinished(false);
              }}
              disabled={step === 2 || !selectedSubject}
            >
              <option value="">Ingrese el profesor</option>
              {professors.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rp-card-footer">
          <button
            type="button"
            className={`rp-btn rp-btn-primary ${
              isAcceptDisabled ? "rp-btn--disabled" : ""
            }`}
            onClick={handleAccept}
            disabled={isAcceptDisabled}
          >
            Aceptar
          </button>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="rp-instructions">
        <p>1. Elije la facultad, la materia y el profesor que desees calificar.</p>
        <p>
          2. Haz click en aceptar y después podrás asignarle una puntuación al
          profesor junto con un comentario.
        </p>
      </div>

      {/* Paso 2: rating / resultado */}
      {step === 2 && selectedProfessorObj && (
        <form className="rp-rating-section" onSubmit={handleOpenConfirm}>
          <div className="rp-rating-left">
            <p className="rp-rating-title">Estás calificando a:</p>
            <div className="rp-prof-card">
              <div className="rp-prof-photo">
                {selectedProfessorObj.photoUrl ? (
                  <img
                    src={selectedProfessorObj.photoUrl}
                    alt={selectedProfessorObj.fullName}
                  />
                ) : (
                  <div className="rp-prof-photo-placeholder" />
                )}
              </div>
              <div className="rp-prof-name">
                {selectedProfessorObj.fullName}
              </div>
            </div>
          </div>

          {/* Derecha: si NO ha finalizado → formulario; si sí → pantalla de éxito */}
          {!isFinished ? (
            <div className="rp-rating-right">
              <div className="rp-rating-header">
                <span>Puntuación general</span>
                <StarRating
                  value={generalRating}
                  onChange={setGeneralRating}
                  disabled={isFinished}
                />
              </div>

              <div className="rp-field">
                <select
                  value={teachingQuality}
                  onChange={(e) => setTeachingQuality(e.target.value)}
                  disabled={isFinished}
                >
                  <option value="">¿Cómo enseña?</option>
                  {teachingOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rp-field">
                <select
                  value={gradingStyle}
                  onChange={(e) => setGradingStyle(e.target.value)}
                  disabled={isFinished}
                >
                  <option value="">¿Cómo califica?</option>
                  {gradingOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rp-field">
                <select
                  value={specialQuality}
                  onChange={(e) => setSpecialQuality(e.target.value)}
                  disabled={isFinished}
                >
                  <option value="">¿Cualidad especial?</option>
                  {specialOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={`rp-btn rp-btn-primary ${
                  isSubmitDisabled ? "rp-btn--disabled" : ""
                }`}
                disabled={isSubmitDisabled}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          ) : (
            <div className="rp-rating-right rp-rating-right--done">
              <div className="rp-rating-header">
                <span>Puntuación general</span>
                <div className="rp-stars rp-stars--readonly">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`rp-star-label ${
                        star <= generalRating ? "rp-star--filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="rp-finished-text">Finalizada con éxito</p>
              <Link href="/" className="rp-link-home">
                Volver a la página de inicio
              </Link>
            </div>
          )}
        </form>
      )}

      {/* Mensajes */}
      {(error || success) && (
        <div className="rp-messages">
          {error && <div className="rp-message rp-message--error">{error}</div>}
          {success && (
            <div className="rp-message rp-message--success">{success}</div>
          )}
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {showConfirm && (
        <div className="rp-modal-overlay">
          <div className="rp-modal">
            <h3>Confirmar calificación</h3>
            <p>¿Deseas enviar tu calificación del profesor?</p>
            <div className="rp-modal-actions">
              <button
                type="button"
                className="rp-btn rp-btn-secondary"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="rp-btn rp-btn-primary"
                onClick={handleConfirmSubmit}
                disabled={loading}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
