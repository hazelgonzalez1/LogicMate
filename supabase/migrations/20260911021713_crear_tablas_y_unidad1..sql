CREATE TABLE public.unidades (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  orden INT NOT NULL
);

CREATE TABLE public.temas (
  id BIGSERIAL PRIMARY KEY,
  unidad_id BIGINT NOT NULL REFERENCES public.unidades(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  nombre TEXT NOT NULL,
  contenido TEXT NOT NULL,
  orden INT NOT NULL
);

CREATE TABLE public.ejercicios (
  id BIGSERIAL PRIMARY KEY,
  tema_id BIGINT NOT NULL REFERENCES public.temas(id) ON DELETE CASCADE,
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,
  respuesta_correcta TEXT NOT NULL,
  explicacion TEXT NOT NULL,
  orden INT NOT NULL
);

CREATE TABLE public.progreso (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ejercicio_id BIGINT NOT NULL REFERENCES public.ejercicios(id) ON DELETE CASCADE,
  es_correcta BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.unidades, public.temas, public.ejercicios TO authenticated, anon;
GRANT SELECT, INSERT ON public.progreso TO authenticated;

ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contenido visible para todos" ON public.unidades FOR SELECT USING (true);
CREATE POLICY "Temas visibles para todos" ON public.temas FOR SELECT USING (true);
CREATE POLICY "Ejercicios visibles para todos" ON public.ejercicios FOR SELECT USING (true);

CREATE POLICY "Ver mi propio progreso" ON public.progreso FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Registrar mi propio progreso" ON public.progreso FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Datos de la Unidad 1: Ecuaciones
DO $$
DECLARE
  v_unidad_id BIGINT;
  v_tema_id BIGINT;
BEGIN
  INSERT INTO public.unidades (nombre, orden) VALUES ('Ecuaciones', 1) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '1.1', 'Ecuaciones bicuadráticas', 'Las ecuaciones de la forma Ax⁴ + Bx² + C = 0, donde A ≠ 0, se llaman ecuaciones bicuadráticas. Se resuelven haciendo el cambio de variable y = x² y resolviendo la ecuación cuadrática resultante. Tienen cuatro soluciones, ya sean todas reales, todas imaginarias, o dos reales y dos imaginarias. También pueden factorizarse en la forma (ax² + b)(cx² + d) mediante el método de la tijera, evitando el cambio de variable.', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Resuelve x⁴ − 5x² + 4 = 0. ¿Cuáles son las soluciones reales?', '["x = ±1 y ±2", "x = ±1 solamente", "No tiene soluciones reales"]', 'x = ±1 y ±2', 'Con y = x²: y² − 5y + 4 = 0 → (y−1)(y−4) = 0 → y = 1 o y = 4. Entonces x = ±1 y x = ±2.', 1),
  (v_tema_id, 'Al factorizar x⁴ − 13x² + 36 con el método de la tijera, se obtiene:', '["(x²−4)(x²−9)", "(x²+4)(x²+9)", "(x²−6)(x²−6)"]', '(x²−4)(x²−9)', 'Se buscan dos números que multiplicados den 36 y sumados den −13: −4 y −9. Por eso (x²−4)(x²−9).', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '1.2', 'Ecuaciones radicales', 'Una ecuación radical es aquella donde la incógnita aparece bajo el signo radical. Se resuelve despejando el radical y elevando al cuadrado. Es indispensable comprobar cada solución en la ecuación original, porque si A² = B² no significa que A = B, así que pueden aparecer soluciones que no cumplen la ecuación original.', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Resuelve √(x+3) = x−3. ¿Cuál es la solución válida?', '["x = 6", "x = 1 y x = 6", "x = 1"]', 'x = 6', 'Al elevar al cuadrado se obtiene x=1 y x=6, pero al comprobar, x=1 no cumple la ecuación original (2 ≠ −2). Solo x=6 es válida.', 1),
  (v_tema_id, '¿Por qué es necesario comprobar las soluciones de una ecuación radical en la ecuación original?', '["Porque elevar al cuadrado puede introducir soluciones que no cumplen la ecuación original", "Porque las ecuaciones radicales no tienen solución", "Porque el grado de la ecuación cambia siempre"]', 'Porque elevar al cuadrado puede introducir soluciones que no cumplen la ecuación original', 'Si A² = B², no necesariamente A = B (por ejemplo 3² = (−3)², pero 3 ≠ −3). Por eso deben comprobarse las soluciones.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '1.3', 'Mínimo común múltiplo de polinomios', 'El mínimo común múltiplo (mcm) de dos o más expresiones es el producto de todos los factores, comunes y no comunes, con la mayor potencia a la que aparecen. Para calcularlo, primero se factoriza completamente cada expresión.', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Cuál es el mcm de x²−4 y x²−4x+4?', '["(x−2)²(x+2)", "(x−2)(x+2)", "(x−2)²(x+2)²"]', '(x−2)²(x+2)', 'x²−4 = (x−2)(x+2) y x²−4x+4 = (x−2)². El mcm toma cada factor con su mayor potencia: (x−2)²(x+2).', 1),
  (v_tema_id, 'Para calcular el mcm de dos expresiones algebraicas, primero se debe:', '["Factorizar completamente cada expresión", "Sumar los exponentes de cada término", "Multiplicar directamente ambas expresiones"]', 'Factorizar completamente cada expresión', 'El mcm se arma a partir de los factores primos de cada expresión, así que primero hay que factorizar completamente.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '1.4', 'Ecuaciones racionales', 'Una ecuación racional contiene fracciones donde la incógnita aparece en algún denominador. Deben excluirse los valores que hacen cero algún denominador. Se resuelve multiplicando toda la ecuación por el mcm de los denominadores y luego resolviendo la ecuación resultante.', 4)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'En 1/x + 1/(x−2) = 3/(x(x−2)), ¿qué valores de x deben excluirse?', '["x = 0 y x = 2", "x = 3", "Ningún valor"]', 'x = 0 y x = 2', 'Esos valores hacen cero a los denominadores x y (x−2), así que no pueden ser parte del dominio de la ecuación.', 1),
  (v_tema_id, 'Resuelve la ecuación anterior: 1/x + 1/(x−2) = 3/(x(x−2))', '["x = 2.5", "x = 2", "x = 0"]', 'x = 2.5', 'Multiplicando por x(x−2): (x−2) + x = 3 → 2x − 2 = 3 → x = 2.5. No coincide con los valores excluidos, así que es válida.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '1.5', 'Sistemas de ecuaciones', 'Para resolver un sistema donde una ecuación es lineal y la otra de grado 2, se despeja una variable en la ecuación lineal y se sustituye en la otra. Conviene despejar en la lineal la variable que tenga menor grado en la ecuación cuadrática.', 5)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Resuelve el sistema: y = x + 1 ; y = x² − 1', '["(2,3) y (−1,0)", "(2,3) solamente", "(−1,0) y (1,2)"]', '(2,3) y (−1,0)', 'Sustituyendo: x+1 = x²−1 → x²−x−2 = 0 → (x−2)(x+1) = 0 → x=2, y=3 o x=−1, y=0.', 1),
  (v_tema_id, 'En un sistema con una ecuación lineal y una cuadrática, ¿qué variable conviene despejar primero en la lineal?', '["La que tenga menor grado en la ecuación cuadrática", "La que tenga mayor coeficiente", "Cualquiera, no importa"]', 'La que tenga menor grado en la ecuación cuadrática', 'Despejar esa variable hace más simple la sustitución y evita ecuaciones más complicadas de resolver.', 2);
END $$;