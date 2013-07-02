    function Ball(gl) {
        var latitudeBands = 30;
        var longitudeBands = 30;
        var radius = 0.5;

        var vertexPositionData = [];
        var normalData = [];
        var colorData = [];
        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                normalData.push(x);
                normalData.push(y);
                normalData.push(z);
                colorData.push(1.0); //r
                colorData.push(0.0); //g
		colorData.push(0.0); //b
		colorData.push(1.0); //a
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
            }
        }

        var indexData = [];
        for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }

        this.ballVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
        this.ballVertexNormalBuffer.itemSize = 3;
        this.ballVertexNormalBuffer.numItems = normalData.length / 3;

        this.ballVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
        this.ballVertexColorBuffer.itemSize = 4;
        this.ballVertexColorBuffer.numItems = colorData.length / 4;

        this.ballVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
        this.ballVertexPositionBuffer.itemSize = 3;
        this.ballVertexPositionBuffer.numItems = vertexPositionData.length / 3;

        this.ballVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ballVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
        this.ballVertexIndexBuffer.itemSize = 1;
        this.ballVertexIndexBuffer.numItems = indexData.length;
    }

    Ball.prototype.draw = function(gl,shaderProgram) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.ballVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.ballVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.ballVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.ballVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ballVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, this.ballVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
