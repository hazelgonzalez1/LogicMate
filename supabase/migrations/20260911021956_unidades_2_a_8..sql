-- Unidades 2 a 8 de LogicMate (contenido oficial + ejercicios con opciones)
DO $$
DECLARE
  v_unidad_id BIGINT;
  v_tema_id BIGINT;
BEGIN
  INSERT INTO public.unidades (nombre, orden) VALUES ('Línea recta', 2) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.1', 'Distancia entre dos puntos', 'La distancia entre dos puntos A y B se denota d(A,B). Si están sobre la recta numérica: d(A,B) = |a - b|. Si están en el plano cartesiano: d(A,B) = √((x2-x1)² + (y2-y1)²).', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Calcula la distancia entre A(1,2) y B(4,6).', '["5", "7", "4"]', '5', 'd = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5.', 1),
  (v_tema_id, 'Calcula la distancia entre P(-2,-1) y Q(3,11).', '["13", "12", "15"]', '13', 'd = √((3-(-2))² + (11-(-1))²) = √(25+144) = √169 = 13.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.2', 'División de un segmento en razón dada (recta numérica)', 'Dados A(a) y B(b) en la recta numérica, el punto P que divide al segmento AB en razón k:n es p = (n·a + k·b)/(k+n).', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el punto P que divide a A(2) y B(10) en razón 1:3.', '["4", "6", "8"]', '4', 'p = (3·2 + 1·10)/(1+3) = (6+10)/4 = 4.', 1),
  (v_tema_id, 'Encuentra el punto P que divide a A(-1) y B(9) en razón 2:3.', '["3", "5", "2"]', '3', 'p = (3·(-1) + 2·9)/(2+3) = (-3+18)/5 = 3.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.3', 'División de un segmento en razón dada (plano cartesiano)', 'Dados A(x1,y1) y B(x2,y2), el punto P que divide a AB en razón k:n es P = ((n·x1+k·x2)/(k+n), (n·y1+k·y2)/(k+n)).', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el punto que divide a A(0,0) y B(5,10) en razón 1:4.', '["(1, 2)", "(2, 4)", "(4, 8)"]', '(1, 2)', 'x=(4·0+1·5)/5=1, y=(4·0+1·10)/5=2. P=(1,2).', 1),
  (v_tema_id, 'Encuentra el punto que divide a A(-2,3) y B(4,-1) en razón 3:2.', '["(1.6, 0.6)", "(2, 1)", "(0.6, 1.6)"]', '(1.6, 0.6)', 'x=(2·(-2)+3·4)/5=1.6, y=(2·3+3·(-1))/5=0.6.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.4', 'Punto medio de un segmento', 'El punto medio es un caso particular de división en razón 1:1. En la recta numérica: p=(a+b)/2. En el plano: P=((x1+x2)/2, (y1+y2)/2).', 4)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el punto medio entre A(-4) y B(6) en la recta numérica.', '["1", "5", "-1"]', '1', 'p = (-4+6)/2 = 1.', 1),
  (v_tema_id, 'Calcula el punto medio del segmento con extremos A(2,5) y B(8,-1).', '["(5, 2)", "(3, 4)", "(6, 1)"]', '(5, 2)', 'Punto medio = ((2+8)/2, (5-1)/2) = (5, 2).', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.5', 'Pendiente y definición de línea recta', 'La pendiente de una recta que pasa por A(x1,y1) y B(x2,y2) es m = (y2-y1)/(x2-x1). Es constante para cualquier par de puntos de la recta.', 5)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Determina la pendiente de la recta que une A(4,2) y B(-2,2).', '["0", "Indefinida", "1"]', '0', 'm = (2-2)/(-2-4) = 0/-6 = 0. Es una recta horizontal.', 1),
  (v_tema_id, 'Calcula la pendiente de la recta definida por P(-1,4) y Q(3,-2).', '["-3/2", "3/2", "-2/3"]', '-3/2', 'm = (-2-4)/(3-(-1)) = -6/4 = -3/2.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.6', 'Ecuación de una recta', 'Formas de representar una recta: punto-pendiente y-y1=m(x-x1); dados dos puntos y-y1=((y2-y1)/(x2-x1))(x-x1); forma general ax+by+c=0.', 6)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Halla la ecuación general de la recta que pasa por A(1,2) y B(3,8).', '["3x - y - 1 = 0", "x - 3y + 5 = 0", "3x + y - 1 = 0"]', '3x - y - 1 = 0', 'm=(8-2)/(3-1)=3. Con A: y-2=3(x-1) → y=3x-1 → 3x-y-1=0.', 1),
  (v_tema_id, 'Convierte la ecuación y - 2 = -2(x + 3) a su forma general.', '["2x + y + 4 = 0", "2x - y + 4 = 0", "-2x + y - 4 = 0"]', '2x + y + 4 = 0', 'y-2=-2x-6 → y=-2x-4 → 2x+y+4=0.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.7', 'Intersección de una recta con los ejes', 'El intercepto con el eje x se halla haciendo y=0 y despejando x. El intercepto con el eje y se halla haciendo x=0 y despejando y.', 7)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra los interceptos con los ejes de 2x + 3y - 6 = 0.', '["(3, 0) y (0, 2)", "(2, 0) y (0, 3)", "(3, 0) y (0, 3)"]', '(3, 0) y (0, 2)', 'y=0: 2x=6, x=3. x=0: 3y=6, y=2.', 1),
  (v_tema_id, 'Determina el intercepto en x e y de y = -4x + 8.', '["(2, 0) y (0, 8)", "(4, 0) y (0, 8)", "(2, 0) y (0, 4)"]', '(2, 0) y (0, 8)', 'y=0: 0=-4x+8, x=2. x=0: y=8.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.8', 'Intersección entre rectas', 'El punto de intersección entre dos rectas se obtiene resolviendo el sistema formado por sus ecuaciones. Si no son paralelas, el punto es único.', 8)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Halla el punto de intersección entre L1: y=2x+1 y L2: y=-x+7.', '["(2, 5)", "(1, 3)", "(3, 7)"]', '(2, 5)', '2x+1=-x+7 → 3x=6 → x=2, y=5.', 1),
  (v_tema_id, 'Determina el punto de corte entre x+y=5 y 2x-y=1.', '["(2, 3)", "(3, 2)", "(1, 4)"]', '(2, 3)', 'Sumando ambas ecuaciones: 3x=6 → x=2, y=3.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.9', 'Rectas paralelas', 'Dos rectas no verticales son paralelas si y solo si tienen la misma pendiente (m1 = m2).', 9)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Son paralelas las rectas y=3x-2 y y=3x+5?', '["Sí, tienen la misma pendiente", "No, tienen distinta pendiente", "No se puede determinar"]', 'Sí, tienen la misma pendiente', 'Ambas tienen pendiente m=3, por lo tanto son paralelas.', 1),
  (v_tema_id, 'Encuentra la ecuación de la recta paralela a y=-2x+4 que pasa por A(1,5).', '["y = -2x + 7", "y = -2x + 4", "y = 2x + 7"]', 'y = -2x + 7', 'Misma pendiente m=-2. Con A(1,5): y-5=-2(x-1) → y=-2x+7.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.10', 'Rectas perpendiculares', 'Dos rectas no verticales con pendientes m1 y m2 son perpendiculares si y solo si m1·m2 = -1.', 10)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Son perpendiculares las rectas con pendientes m1=2 y m2=-1/2?', '["Sí, su producto es -1", "No, su producto no es -1", "No se puede saber"]', 'Sí, su producto es -1', '2 · (-1/2) = -1, por lo tanto son perpendiculares.', 1),
  (v_tema_id, 'Encuentra la pendiente de una recta perpendicular a y=(3/4)x - 1.', '["-4/3", "4/3", "-3/4"]', '-4/3', 'La pendiente perpendicular es el recíproco negativo: -1/(3/4) = -4/3.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.11', 'Distancia de un punto a una recta', 'La distancia de un punto P(x1,y1) a una recta ax+by+c=0 es d(P,L) = |a·x1+b·y1+c| / √(a²+b²).', 11)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Calcula la distancia del origen P(0,0) a la recta 5x - 12y + 26 = 0.', '["2", "1", "3"]', '2', 'd = |5(0)-12(0)+26| / √(25+144) = 26/13 = 2.', 1),
  (v_tema_id, 'Calcula la distancia de P(1,2) a la recta 3x + 4y - 5 = 0.', '["1.2", "2.4", "0.6"]', '1.2', 'd = |3(1)+4(2)-5| / √(9+16) = 6/5 = 1.2.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.12', 'Ángulo de inclinación de una recta', 'El ángulo de inclinación θ de una recta es el formado con la parte positiva del eje x, medido en sentido antihorario, con 0° ≤ θ < 180° y tan θ = m.', 12)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el ángulo de inclinación de una recta con pendiente m=1.', '["45°", "90°", "135°"]', '45°', 'tan θ = 1 → θ = 45°.', 1),
  (v_tema_id, 'Determina el ángulo de inclinación si la pendiente es m=-1.', '["135°", "45°", "-45°"]', '135°', 'tan θ=-1 da -45°, pero como θ debe estar en [0°,180°), se suma 180°: θ=135°.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '2.13', 'Ángulo entre dos rectas', 'Si α es el ángulo entre dos rectas con pendientes m1 y m2, entonces tan α = (m2-m1)/(1+m1·m2), válido si m1·m2 ≠ -1.', 13)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Cuál es la tangente del ángulo entre las rectas con pendientes m1=1 y m2=3?', '["0.5", "2", "1.5"]', '0.5', 'tan α = (3-1)/(1+1·3) = 2/4 = 0.5.', 1),
  (v_tema_id, '¿Qué ocurre en la fórmula del ángulo entre dos rectas perpendiculares?', '["El denominador se hace cero y el ángulo es 90°", "El ángulo siempre es 0°", "La fórmula nunca aplica a perpendiculares"]', 'El denominador se hace cero y el ángulo es 90°', 'Si m1·m2=-1, el denominador (1+m1m2) es cero, indicando que el ángulo tiende a 90°.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Secciones cónicas', 3) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.1', 'Lugar geométrico de una ecuación', 'El lugar geométrico de una ecuación es el conjunto de todos los puntos del plano que la satisfacen. Puede ser un punto, una recta, una circunferencia, una parábola, etc.', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Qué figura representa la ecuación x² + y² = 25?', '["Una circunferencia de radio 5", "Una parábola", "Una recta"]', 'Una circunferencia de radio 5', 'La forma x²+y²=r² representa una circunferencia centrada en el origen con radio r=5.', 1),
  (v_tema_id, '¿Qué representa la ecuación x = 3 en el plano cartesiano?', '["Una recta vertical", "Un punto", "Una circunferencia"]', 'Una recta vertical', 'Todos los puntos con x=3, sin importar el valor de y, forman una recta vertical.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.2', 'Ecuación de un lugar geométrico', 'Para hallar la ecuación de un lugar geométrico se plantea una igualdad que cumpla las condiciones dadas, usando fórmulas de distancia entre puntos o de punto a recta.', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Un punto se mueve manteniendo distancia 4 del punto P(2,0). ¿Cuál es su ecuación?', '["(x-2)² + y² = 16", "(x-2)² + y² = 4", "x² + (y-2)² = 16"]', '(x-2)² + y² = 16', 'La distancia constante 4 al punto (2,0) da √((x-2)²+y²)=4, elevando al cuadrado: (x-2)²+y²=16.', 1),
  (v_tema_id, '¿Qué ecuación describe los puntos que equidistan del origen a distancia 5?', '["x² + y² = 25", "x² + y² = 5", "x + y = 25"]', 'x² + y² = 25', 'La distancia al origen es √(x²+y²)=5, elevando al cuadrado: x²+y²=25.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.3', 'La parábola', 'Una parábola con vértice en el origen tiene ecuación y = (1/4p)x². El foco es F(0,p) y la directriz es y=-p. Si p<0 abre hacia abajo. Si es horizontal: x=(1/4p)y².', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Dada la parábola y = (1/8)x², encuentra su foco.', '["(0, 2)", "(0, 8)", "(2, 0)"]', '(0, 2)', '4p=8 → p=2. El foco es F(0,p)=(0,2).', 1),
  (v_tema_id, 'Encuentra la ecuación de una parábola con vértice en el origen y foco en F(0,3).', '["y = x²/12", "y = x²/3", "y = 3x²"]', 'y = x²/12', '4p=4(3)=12, por lo tanto y = (1/12)x².', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.4', 'Desplazamientos paralelos', 'La parábola con vértice desplazado a V(h,k) tiene ecuación y-k=(1/4p)(x-h)². El vértice es V(h,k), el foco F(h,p+k) y la directriz y=-p+k.', 4)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el vértice de (y-2) = (1/4)(x-3)².', '["(3, 2)", "(2, 3)", "(-3, -2)"]', '(3, 2)', 'Comparando con y-k=(1/4p)(x-h)²: h=3, k=2, entonces V(3,2).', 1),
  (v_tema_id, 'Para la parábola del ejercicio anterior, encuentra el foco.', '["(3, 3)", "(3, 1)", "(4, 2)"]', '(3, 3)', '4p=4 → p=1. Foco=(h, p+k)=(3, 1+2)=(3,3).', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.5', 'Procedimiento para completar cuadrados perfectos', 'Completar cuadrados transforma un trinomio en el cuadrado de un binomio: (x+a)²=x²+2ax+a². El término a² se obtiene dividiendo el coeficiente de x entre 2 y elevando al cuadrado.', 5)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Qué término se debe sumar para completar el cuadrado en x² + 6x?', '["9", "6", "3"]', '9', 'El coeficiente de x es 6; (6/2)²=9.', 1),
  (v_tema_id, '¿Qué término se debe sumar para completar el cuadrado en x² - 4x?', '["4", "2", "-4"]', '4', 'El coeficiente de x es -4; (-4/2)²=4.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.6', 'Ecuación general de la parábola', 'La ecuación general de una parábola es ax²+bx+cy+d=0. Para hallar sus elementos (vértice, foco, directriz) se completa el cuadrado para volver a la forma canónica.', 6)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Al completar el cuadrado en x² - 4x - 8y + 12 = 0, ¿cuál es el vértice?', '["(2, 1)", "(4, 1)", "(2, -1)"]', '(2, 1)', '(x-2)²-4-8y+12=0 → (x-2)²=8y-8 → y-1=(1/8)(x-2)². Vértice=(2,1).', 1),
  (v_tema_id, 'En la ecuación general y² - 4x + 2y + 5 = 0, ¿qué variable se debe agrupar para completar cuadrados?', '["y, porque es la variable al cuadrado", "x, porque aparece con coeficiente", "Ninguna, ya está en forma canónica"]', 'y, porque es la variable al cuadrado', 'Como y aparece elevada al cuadrado, la parábola es horizontal y se agrupan los términos en y.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '3.7', 'Líneas rectas y parábolas', 'La intersección entre una recta y una parábola se halla resolviendo el sistema de ecuaciones. Según el discriminante, la recta puede ser secante (2 puntos), tangente (1 punto) o exterior (0 puntos).', 7)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra los puntos de intersección entre y=2x y y=x².', '["(0,0) y (2,4)", "(0,0) y (4,2)", "(1,2) y (2,4)"]', '(0,0) y (2,4)', '2x=x² → x²-2x=0 → x(x-2)=0 → x=0 o x=2. Puntos: (0,0) y (2,4).', 1),
  (v_tema_id, 'Si un sistema recta-parábola tiene una única solución real, la recta es:', '["Tangente a la parábola", "Secante a la parábola", "Exterior a la parábola"]', 'Tangente a la parábola', 'Una única intersección significa que el discriminante es cero, lo cual define una recta tangente.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Funciones Trascendentales I', 4) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '4.1', 'Definición de función exponencial y sus propiedades', 'Una función exponencial tiene la forma f(x)=aˣ, con a>0 y a≠1. Su dominio es ℝ y su rango es y>0. Si a>1 es creciente; si 0<a<1 es decreciente.', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Evalúa f(x)=2ˣ en x=3.', '["8", "6", "9"]', '8', 'f(3)=2³=8.', 1),
  (v_tema_id, '¿La función f(x)=(0.5)ˣ es creciente o decreciente?', '["Decreciente", "Creciente", "Constante"]', 'Decreciente', 'Como la base 0.5 está entre 0 y 1, la función es decreciente.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '4.2', 'Gráfica de la función exponencial', 'La gráfica de f(x)=aˣ siempre pasa por (0,1) y tiene una asíntota horizontal en y=0, a la cual se aproxima sin tocarla nunca.', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿Por qué punto pasa siempre la gráfica de f(x)=aˣ?', '["(0, 1)", "(1, 0)", "(0, 0)"]', '(0, 1)', 'Cualquier número elevado a la potencia 0 es 1, así que f(0)=a⁰=1.', 1),
  (v_tema_id, '¿Puede la gráfica de f(x)=4ˣ cruzar el eje x?', '["No, porque tiene una asíntota horizontal en y=0", "Sí, cuando x es muy negativo", "Sí, en x=0"]', 'No, porque tiene una asíntota horizontal en y=0', 'El rango de la función exponencial es y>0, por lo que nunca toca ni cruza el eje x.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '4.3', 'Ecuaciones exponenciales', 'Para resolver una ecuación exponencial se igualan las bases: si aᵐ=aⁿ con la misma base positiva, entonces m=n.', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Resuelve la ecuación 2ˣ = 32.', '["x = 5", "x = 4", "x = 6"]', 'x = 5', '32=2⁵, entonces x=5.', 1),
  (v_tema_id, 'Encuentra el valor de x en 3^(2x-1) = 27.', '["x = 2", "x = 1", "x = 3"]', 'x = 2', '27=3³, entonces 2x-1=3 → 2x=4 → x=2.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '4.4', 'Introducción a los logaritmos', 'El logaritmo de un número es el exponente al que se debe elevar una base para obtenerlo: logₐ b = c ⟺ aᶜ = b, con a>0, a≠1, b>0.', 4)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Calcula el valor de log₂(32).', '["5", "4", "6"]', '5', '2⁵=32, entonces log₂(32)=5.', 1),
  (v_tema_id, 'Encuentra x en la expresión log₂(x) = 4.', '["x = 16", "x = 8", "x = 4"]', 'x = 16', '2⁴=16, entonces x=16.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '4.5', 'Propiedades de los logaritmos', 'Propiedades: logₐ(x·y)=logₐx+logₐy (producto), logₐ(x/y)=logₐx-logₐy (cociente), logₐ(xʳ)=r·logₐx (potencia).', 5)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Simplifica log₃(18) - log₃(2).', '["log₃(9) = 2", "log₃(16) = 2.5", "log₃(20)"]', 'log₃(9) = 2', 'Por la propiedad del cociente: log₃(18/2)=log₃(9)=2, ya que 3²=9.', 1),
  (v_tema_id, '¿Cuál es la forma correcta de log₂(x·y)?', '["log₂(x) + log₂(y)", "log₂(x) · log₂(y)", "log₂(x) - log₂(y)"]', 'log₂(x) + log₂(y)', 'La propiedad del producto convierte el logaritmo de un producto en una suma de logaritmos.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Funciones Trascendentales II', 5) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '5.1', 'Funciones biyectivas e inversas', 'Una función es inyectiva si elementos diferentes del dominio dan imágenes diferentes, y sobreyectiva si todo el codominio es alcanzado. Es biyectiva si es ambas, y solo entonces tiene inversa. Si f(a)=b, entonces f⁻¹(b)=a.', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra la función inversa de f(x) = 4x - 7.', '["f⁻¹(x) = (x+7)/4", "f⁻¹(x) = (x-7)/4", "f⁻¹(x) = 4x+7"]', 'f⁻¹(x) = (x+7)/4', 'Sea y=4x-7. Despejando x: x=(y+7)/4. Por lo tanto f⁻¹(x)=(x+7)/4.', 1),
  (v_tema_id, '¿La función f(x)=x² con dominio ℝ es biyectiva?', '["No, porque no es inyectiva (f(2)=f(-2))", "Sí, es biyectiva", "Sí, porque siempre da un resultado"]', 'No, porque no es inyectiva (f(2)=f(-2))', 'Dos valores distintos como 2 y -2 dan la misma imagen (4), así que no es inyectiva y por tanto no es biyectiva.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '5.2', 'Función logarítmica', 'La función logarítmica f(x)=logₐx es la inversa de la función exponencial g(x)=aˣ. Su dominio es x>0 y su rango es todo ℝ. Su gráfica es simétrica a la exponencial respecto a la recta y=x.', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Calcula log₂(32).', '["5", "4", "6"]', '5', '2⁵=32, entonces log₂(32)=5.', 1),
  (v_tema_id, 'Resuelve log₃(x) = 4.', '["x = 81", "x = 12", "x = 64"]', 'x = 81', '3⁴=81, entonces x=81.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '5.3', 'Funciones trigonométricas', 'Para un punto P(x,y) con r=√(x²+y²): sen θ = y/r, cos θ = x/r, tan θ = y/x. Estas razones dependen solo del ángulo, no del tamaño del segmento.', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Para el punto P(3,4), calcula sen θ.', '["4/5", "3/5", "3/4"]', '4/5', 'r=√(3²+4²)=√25=5. sen θ = y/r = 4/5.', 1),
  (v_tema_id, '¿Qué transformación sufre la gráfica al pasar de f(θ)=sen θ a g(θ)=sen θ + 2?', '["Se desplaza 2 unidades hacia arriba", "Cambia su período", "Se desplaza 2 unidades a la derecha"]', 'Se desplaza 2 unidades hacia arriba', 'Sumar una constante fuera de la función desplaza verticalmente la gráfica, sin cambiar su forma ni período.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Sucesiones aritméticas y geométricas', 6) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '6.1', 'Sucesiones aritméticas', 'Una sucesión aritmética suma una diferencia constante d a cada término. Término general: aₙ = a1 + d(n-1). Suma de los primeros n términos: Sₙ = (n/2)[2a1 + d(n-1)].', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el término 20 de la sucesión aₙ = 3 + 4(n-1).', '["79", "76", "83"]', '79', 'a20 = 3 + 4(20-1) = 3 + 76 = 79.', 1),
  (v_tema_id, 'Calcula la suma de los primeros 15 términos con a1=5 y d=3.', '["390", "375", "405"]', '390', 'S15 = (15/2)[2(5)+3(14)] = 7.5 × 52 = 390.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '6.2', 'Sucesiones geométricas', 'Una sucesión geométrica multiplica una razón constante r a cada término. Término general: aₙ = a1·r^(n-1). Suma de los primeros n términos (r≠1): Sₙ = a1(rⁿ-1)/(r-1).', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Encuentra el sexto término de aₙ = 2(3)^(n-1).', '["486", "162", "972"]', '486', 'a6 = 2(3)⁵ = 2 × 243 = 486.', 1),
  (v_tema_id, 'Calcula la suma de los primeros cinco términos de 2, 6, 18, 54, ...', '["242", "240", "250"]', '242', 'a1=2, r=3. S5 = 2(3⁵-1)/(3-1) = 2(242)/2 = 242.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Métodos de conteo', 7) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '7.1', 'Conjuntos', 'Un conjunto es una colección de elementos. Su cardinalidad n(A) es la cantidad de elementos. Puede expresarse por extensión o comprensión, y representarse con diagramas de Venn.', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Determina la cardinalidad de A = {2,4,6,8,10,12}.', '["6", "5", "7"]', '6', 'El conjunto A tiene 6 elementos listados, así que n(A)=6.', 1),
  (v_tema_id, 'Si A={1,2,3,4} y B={3,4,5,6}, ¿cuál es A ∩ B?', '["{3, 4}", "{1, 2, 5, 6}", "{1, 2, 3, 4, 5, 6}"]', '{3, 4}', 'La intersección son los elementos que están en ambos conjuntos: 3 y 4.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '7.2', 'Permutaciones', 'Una permutación ordena n elementos donde el orden importa: Pₙ = n!. Con elementos repetidos: n!/(r1!·r2!···rk!).', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿De cuántas maneras pueden ordenarse 5 libros diferentes en una estantería?', '["120", "60", "20"]', '120', '5! = 5×4×3×2×1 = 120.', 1),
  (v_tema_id, '¿Cuántas formas diferentes hay de ordenar las letras de la palabra CASA?', '["12", "24", "6"]', '12', 'CASA tiene 4 letras con la A repetida 2 veces: 4!/2! = 24/2 = 12.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '7.3', 'Combinaciones', 'Una combinación selecciona elementos sin importar el orden: C(n,r) = n!/(r!(n-r)!).', 3)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, '¿De cuántas maneras pueden seleccionarse 3 estudiantes de un grupo de 8?', '["56", "24", "336"]', '56', 'C(8,3) = 8!/(3!·5!) = 56.', 1),
  (v_tema_id, '¿Cuántos grupos de 4 personas pueden formarse a partir de 10 personas?', '["210", "5040", "40"]', '210', 'C(10,4) = 10!/(4!·6!) = 210.', 2);

  INSERT INTO public.unidades (nombre, orden) VALUES ('Probabilidad', 8) RETURNING id INTO v_unidad_id;

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '8.1', 'Probabilidad y axiomas de Kolmogórov', 'Un experimento produce resultados; el espacio muestral S los reúne todos. Si los resultados son igualmente probables: P(A)=n(A)/n(S). Axiomas: P(S)=1, P(A)≥0. Si A y B son excluyentes: P(A∪B)=P(A)+P(B).', 1)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Se lanza un dado. ¿Cuál es la probabilidad de obtener un número par?', '["1/2", "1/3", "1/6"]', '1/2', 'Hay 3 números pares (2,4,6) de 6 posibles: 3/6 = 1/2.', 1),
  (v_tema_id, 'Se lanza una moneda dos veces. ¿Cuál es la probabilidad de obtener dos caras?', '["1/4", "1/2", "1/3"]', '1/4', 'Hay 4 resultados posibles (CC, CX, XC, XX) y solo uno es CC: 1/4.', 2);

  INSERT INTO public.temas (unidad_id, numero, nombre, contenido, orden) VALUES
  (v_unidad_id, '8.2', 'Probabilidad condicional', 'La probabilidad condicional mide la posibilidad de que ocurra A sabiendo que ya ocurrió B: P(A|B) = P(A∩B)/P(B). Si A y B son independientes: P(A∩B)=P(A)·P(B).', 2)
  RETURNING id INTO v_tema_id;
  INSERT INTO public.ejercicios (tema_id, enunciado, opciones, respuesta_correcta, explicacion, orden) VALUES
  (v_tema_id, 'Una bolsa tiene 5 bolas rojas y 3 azules. Se extrae una y no se devuelve. ¿Cuál es P(2ª azul | 1ª roja)?', '["3/7", "3/8", "5/7"]', '3/7', 'Tras sacar una roja quedan 7 bolas (3 azules): P = 3/7.', 1),
  (v_tema_id, 'En una baraja de 52 cartas, sabiendo que una carta es roja, ¿cuál es la probabilidad de que sea de corazones?', '["1/2", "1/4", "1/13"]', '1/2', 'Hay 26 cartas rojas y 13 son corazones: P = 13/26 = 1/2.', 2);

END $$;