WebGL-Test
==========

COM VISUALITZAR:

1. Tancar totes les pestanyes de chrome
2. En linux, executar: chromium-browser --allow-file-access-from-files
3. Obrir el html corresponent amb aquell navegador

El primer dia només hi ha llum direccional per vèrtex + ambient, poden dibuixar fent servir les funcions provistes per Ball.js, Cube.js i Pyramid.js.
Tenen una uniform de color per substituir el color per defecte dels objectes (blau, vermell o verd segons la cara) per qualsevol altre. Si el color està a (0,0,0) es dibuixa el color per defecte dels vèrtex i si no, es dibuixa amb el color proveït. Les funcions de dibuix presuposen que la modelview ja ha estat transformada adequadament i les uniforms corresponents han estat enviades.

El ultim dia (dia 5) hi ha una point light per fragment + ambient, poden dibuixar models amb textures amb les funcions de Ball.js i Cube.js. Les textures es troben dins de dia5_inici/index/. La modelView ha estat separada en View i Model per a poder fer transformacions en view space (com ara la posició de la llum, que no ha de tenir les transformacions del model). Aquest esquelet és només un exemple ja que se suposa que en aquest punt saben definir els seus propis objectes. El que falta és un carregador de OBJs.

Falta només el carregador de OBJs. He mirat SpiderGL però és massa extès (està integrat per tot tipus de format, no només OBJs) com per extraure el carregador i que quedi bé, no sé ben bé com fer-ho. 
