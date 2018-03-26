/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');
var $$ = Dom7;

var apiUrl = "https://api.themoviedb.org/3";
var apiKey = "<<<<<<<YOUR KEY>>>>>>>";
var compiledMovieList;
var template;
var configuration;	

function startApp(){
	
	template = $$('#movie-list').html();
	compiledMovieList = Template7.compile(template);
	
	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;
		
		app.request.json(apiUrl + '/movie/top_rated?api_key='+apiKey+'&language=en-US&page=1', function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			console.log(data);

			$$("#movie-list").html(compiledMovieList(data));

		});
	});
}

document.addEventListener('deviceready', startApp, false);

