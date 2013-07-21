    function Pyramid(gl) {
	//POSICIONS
	this.VertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	vertices = [
		-0.5,-0.5, 0.5, //front
		 0.5,-0.5, 0.5,
		 0.0, 0.5, 0.0,

		 0.5,-0.5,-0.5, //back
		-0.5,-0.5,-0.5,
		 0.0, 0.5, 0.0,

		-0.5,-0.5,-0.5, //left
		-0.5,-0.5, 0.5,
		 0.0, 0.5, 0.0,

		 0.5,-0.5, 0.5, //right
		 0.5,-0.5,-0.5,
		 0.0, 0.5, 0.0,

		 0.5,-0.5, 0.5, //bottom (base 1)
		-0.5,-0.5,-0.5,
		 0.5,-0.5,-0.5,

		 0.5,-0.5, 0.5, //bottom (base 2)
		-0.5,-0.5, 0.5,
		-0.5,-0.5,-0.5,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.VertexPositionBuffer.itemSize = 3;
        this.VertexPositionBuffer.numItems = 18;

	//NORMALS
        this.VertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
        normals = [
		[   0, 0.5, 1], //no normalitzades
	        [   0, 0.5,-1],
                [  -1, 0.5, 0],
		[   1, 0.5, 0],
		[   0,  -1, 0], 
		[   0,  -1, 0]
        ];
        var unpackedNormals = [];
        for (var i in normals) {
            var normal = normals[i];
            for (var j=0; j < 3; j++) {
                unpackedNormals = unpackedNormals.concat(normal);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedNormals), gl.STATIC_DRAW);
        this.VertexNormalBuffer.itemSize = 3;
        this.VertexNormalBuffer.numItems = 18;

	//COLORS
        this.VertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        colors = [
            [ 0.0, 0.0, 1.0, 1.0], // front 
            [ 0.0, 0.0, 1.0, 1.0], // back 
            [ 0.0, 1.0, 0.0, 1.0], // top 
            [ 0.0, 1.0, 0.0, 1.0], // bottom 
            [ 1.0, 0.0, 0.0, 1.0], // left (base) 1
            [ 1.0, 0.0, 0.0, 1.0]  // left (base) 2 
        ];
        var unpackedColors = [];
        for (var i in colors) {
            var color = colors[i];
            for (var j=0; j < 3; j++) {
                unpackedColors = unpackedColors.concat(color);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
        this.VertexColorBuffer.itemSize = 4;
        this.VertexColorBuffer.numItems = 18;

	// INDICES
	this.VertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	var pyrIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pyrIndices), gl.STATIC_DRAW);
        this.VertexIndexBuffer.itemSize = 1;
        this.VertexIndexBuffer.numItems = 18;
    }

    Pyramid.prototype.draw = function(gl,shaderProgram) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.VertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, this.VertexPositionBuffer.numItems);
    }
