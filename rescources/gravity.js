

			var delta = [ 0, 0 ];
			var stage = [ window.screenX, window.screenY, window.innerWidth, window.innerHeight ];
			getBrowserDimensions();

			var isRunning = false;
			var isMouseDown = false;

			var worldAABB;
			var world;
			var iterations = 1;

			var walls = [];
			var wall_thickness = 200;
			var wallsSetted = false;

			var mouseJoint;
			var mouse = { x: 0, y: 0 };

			var mouseOnClick = [];

			var elements = [];
			var bodies = [];
			var properties = [];

			var query, page = 0;

			var gWebSearch, gImageSearch;
			var imFeelingLuckyMode = false;
			var resultBodies = [];

			var gravity = { x: 0, y: 1 };

			init();

			if ( location.search != "" ) {

				var params = location.search.substr(1).split("&")

				for (var i = 0; i < params.length; i++) {

					var param = params[i].split("=");

					if (param[0] == "q") {

						document.getElementById('q').value = param[1];
						run();
						break;
					}
				}
			}

			//

			function init() {

				/*
				gWebSearch = new google.search.WebSearch();
				gWebSearch.setResultSetSize( google.search.Search.SMALL_RESULTSET );
				gWebSearch.setSearchCompleteCallback( null, onWebSearch );

				gImageSearch = new google.search.ImageSearch();
				gImageSearch.setResultSetSize( google.search.Search.SMALL_RESULTSET );
				gImageSearch.setSearchCompleteCallback( null, onImageSearch );
				*/

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				document.addEventListener( 'keyup', onDocumentKeyUp, false );


				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				document.addEventListener( 'touchend', onDocumentTouchEnd, false );

				window.addEventListener( 'deviceorientation', onWindowDeviceOrientation, false );

				// init box2d

				worldAABB = new b2AABB();
				worldAABB.minVertex.Set( - 200, - 200 );
				worldAABB.maxVertex.Set( window.innerWidth + 200, window.innerHeight + 200 );

				world = new b2World( worldAABB, new b2Vec2( 0, 0 ), true );

				// walls
				setWalls();

				// Get box2d elements

				elements = getElementsByClass("box2d");

				for ( var i = 0; i < elements.length; i ++ ) {

					properties[i] = getElementProperties( elements[i] );

				}

				for ( var i = 0; i < elements.length; i ++ ) {

					var element = elements[ i ];
					element.style.position = 'absolute';
					element.style.left = properties[i][0] + 'px';
					element.style.top = properties[i][1] + 'px';
					element.style.width = properties[i][2] + 'px';
					element.addEventListener( 'mousedown', onElementMouseDown, false );
					element.addEventListener( 'mouseup', onElementMouseUp, false );
					element.addEventListener( 'click', onElementClick, false );

					bodies[i] = createBox( world, properties[i][0] + (properties[i][2] >> 1), properties[i][1] + (properties[i][3] >> 1), properties[i][2] / 2, properties[i][3] / 2, false );

					// Clean position dependencies

					while ( element.offsetParent ) {

						element = element.offsetParent;
						element.style.position = 'static';

					}

				}

			}

			function run() {

				isRunning = true;
				requestAnimationFrame( loop );

			}

			//

			function onDocumentMouseDown( event ) {

				isMouseDown = true;

			}

			function onDocumentMouseUp( event ) {

				isMouseDown = false;

			}

			function onDocumentMouseMove( event ) {

				if ( !isRunning ) run();

				mouse.x = event.clientX;
				mouse.y = event.clientY;

			}

			function onDocumentKeyUp( event ) {

				// if ( event.keyCode == 13 ) search();

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					if ( !isRunning ) {

						run();

					}

					mouse.x = event.touches[0].pageX;
					mouse.y = event.touches[0].pageY;
					isMouseDown = true;
				}
			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouse.x = event.touches[0].pageX;
					mouse.y = event.touches[0].pageY;

				}

			}

			function onDocumentTouchEnd( event ) {

				if ( event.touches.length == 0 ) {

					isMouseDown = false;
				}

			}

			function onWindowDeviceOrientation( event ) {

				if ( event.beta ) {

					gravity.x = Math.sin( event.gamma * Math.PI / 180 );
					gravity.y = Math.sin( ( Math.PI / 4 ) + event.beta * Math.PI / 180 );

				}

			}

			//

			function onElementMouseDown( event ) {

				event.preventDefault();

				mouseOnClick[0] = event.clientX;
				mouseOnClick[1] = event.clientY;

			}

			function onElementMouseUp( event ) {

				event.preventDefault();

			}

			function onElementClick( event ) {

				var range = 5;

				if ( mouseOnClick[0] > event.clientX + range || mouseOnClick[0] < event.clientX - range &&
				     mouseOnClick[1] > event.clientY + range || mouseOnClick[1] < event.clientY - range ) {

					event.preventDefault();

				}

				// if ( event.target == document.getElementById( 'btnG' ) ) search();
				// if ( event.target == document.getElementById( 'btnI' ) ) imFeelingLucky();
				if ( event.target == document.getElementById( 'q' ) ) document.getElementById('q').focus();

			}

			// API STUFF

			/*
			function search() {

				if ( !isRunning ) {

					run();

				}

				if ( query == document.getElementById('q').value ) {

					page ++;

					gWebSearch.gotoPage( page );
					gImageSearch.gotoPage( page );

				} else {

					page = 0;

					query = document.getElementById('q').value;

					gWebSearch.execute( query );
					gImageSearch.execute( query );

				}

				return false;

			}

			function imFeelingLucky() {

				imFeelingLuckyMode = true;
				gWebSearch.execute( document.getElementById('q').value );

				return false;

			}

			function onWebSearch() {

				if ( imFeelingLuckyMode ) {

					location.href = gWebSearch.results[0].unescapedUrl;
					return;

				}

				for ( var i = 0; i < gWebSearch.results.length; i ++ ) {

					addWeb( gWebSearch.results[i] );

				}

			}

			function onImageSearch() {

				for ( var i = 0; i < gImageSearch.results.length; i ++ ) {

					addImage( gImageSearch.results[i] );

				}

			}

			function addWeb( data ) {

				var element = document.createElement('div');
				element.innerHTML = '<div class="result"><div class="title"><a href="' + data.unescapedUrl + '" target="_blank">' + data.title + '</a></div><div class="url">' + data.visibleUrl + '</div><div class="content">' + data.content + '</div>';

				document.body.appendChild( element );

				properties.push( [ Math.random() * ( window.innerWidth / 2 ), - 200, 546, element.offsetHeight ] );

				var i = properties.length - 1;

				element.style.position = 'absolute';
				element.style.left = 0 + 'px';
				element.style.top = - 100 + 'px';
				element.style.backgroundColor = '#ffffff';
				element.addEventListener( 'mousedown', onElementMouseDown, false );
				element.addEventListener( 'mouseup', onElementMouseUp, false );
				element.addEventListener( 'click', onElementClick, false );

				elements[i] = element;

				resultBodies.push( bodies[i] = createBox( world, properties[i][0] + ( properties[i][2] >> 1 ), properties[i][1] + ( properties[i][3] >> 1 ), properties[i][2] / 2, properties[i][3] / 2, false, element ) );

			}

			function addImage( data ) {

				var element = document.createElement( 'img' );
				element.style.display = 'none';
				element.style.cursor = 'pointer';
				element.addEventListener( 'load', function () {

					properties.push( [ Math.random() * ( window.innerWidth / 2 ), - 200, element.width, element.height ] );

					var i = properties.length - 1;

					element.style.display = 'block';
					element.style.position = 'absolute';
					element.style.left = 0 + 'px';
					element.style.top = - 200 + 'px';
					element.style.backgroundColor = '#ffffff';
					element.addEventListener( 'mousedown', onElementMouseDown, false );
					element.addEventListener( 'mouseup', onElementMouseUp, false );
					element.addEventListener( 'click', onElementClick, false );
					element.addEventListener( 'click', function ( event ) {

						var range = 5;

						if ( mouseOnClick[0] < event.clientX + range && mouseOnClick[0] > event.clientX - range &&
						     mouseOnClick[1] < event.clientY + range && mouseOnClick[1] > event.clientY - range ) {

							window.open( data.unescapedUrl );

						}

					}, false );

					elements[i] = element;

					resultBodies.push( bodies[i] = createBox( world, properties[i][0] + ( properties[i][2] >> 1 ), properties[i][1] + ( properties[i][3] >> 1 ), properties[i][2] / 2, properties[i][3] / 2, false, element ) );

				}, false );
				element.src = data.tbUrl;
				document.body.appendChild( element );

			}
			*/

			//

			var prevTime;

			function loop() {

				requestAnimationFrame( loop );
			
				if ( prevTime === undefined ) {

					prevTime = Date.now();
				
				}
			
				var time = Date.now();
				var timeStep = ( time - prevTime ) / 1000;

				prevTime = time;

				//

				if (getBrowserDimensions())
					setWalls();

				delta[0] += (0 - delta[0]) * .5;
				delta[1] += (0 - delta[1]) * .5;

				world.m_gravity.x = gravity.x * 750 + delta[0];
				world.m_gravity.y = gravity.y * 750 + delta[1];

				mouseDrag();
				world.Step(timeStep, iterations);

				for ( i = 0; i < elements.length; i++ ) {

					var body = bodies[i];
					var element = elements[i];

					element.style.left = (body.m_position0.x - (properties[i][2] >> 1)) + 'px';
					element.style.top = (body.m_position0.y - (properties[i][3] >> 1)) + 'px';

					var style = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg)';

					element.style.transform = style;
					element.style.WebkitTransform = style + ' translateZ(0)'; // Force HW Acceleration
					element.style.MozTransform = style;
					element.style.OTransform = style;
					element.style.msTran…
