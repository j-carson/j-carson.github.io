(function() {
  var fn = function() {
    
    (function(root) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof root._bokeh_onload_callbacks === "undefined" || force === true) {
        root._bokeh_onload_callbacks = [];
        root._bokeh_is_loading = undefined;
      }
    
      
      
    
      var element = document.getElementById("8fec577e-a21e-4bd6-883a-fdf14f269da6");
        if (element == null) {
          console.warn("Bokeh: autoload.js configured with elementid '8fec577e-a21e-4bd6-883a-fdf14f269da6' but no matching script tag was found.")
        }
      
    
      function run_callbacks() {
        try {
          root._bokeh_onload_callbacks.forEach(function(callback) {
            if (callback != null)
              callback();
          });
        } finally {
          delete root._bokeh_onload_callbacks
        }
        console.debug("Bokeh: all callbacks have finished");
      }
    
      function load_libs(css_urls, js_urls, callback) {
        if (css_urls == null) css_urls = [];
        if (js_urls == null) js_urls = [];
    
        root._bokeh_onload_callbacks.push(callback);
        if (root._bokeh_is_loading > 0) {
          console.debug("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.debug("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        root._bokeh_is_loading = css_urls.length + js_urls.length;
    
        function on_load() {
          root._bokeh_is_loading--;
          if (root._bokeh_is_loading === 0) {
            console.debug("Bokeh: all BokehJS libraries/stylesheets loaded");
            run_callbacks()
          }
        }
    
        function on_error() {
          console.error("failed to load " + url);
        }
    
        for (var i = 0; i < css_urls.length; i++) {
          var url = css_urls[i];
          const element = document.createElement("link");
          element.onload = on_load;
          element.onerror = on_error;
          element.rel = "stylesheet";
          element.type = "text/css";
          element.href = url;
          console.debug("Bokeh: injecting link tag for BokehJS stylesheet: ", url);
          document.body.appendChild(element);
        }
    
        const hashes = {"https://cdn.bokeh.org/bokeh/release/bokeh-2.2.3.min.js": "T2yuo9Oe71Cz/I4X9Ac5+gpEa5a8PpJCDlqKYO0CfAuEszu1JrXLl8YugMqYe3sM", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.3.min.js": "98GDGJ0kOMCUMUePhksaQ/GYgB3+NH9h996V88sh3aOiUNX3N+fLXAtry6xctSZ6", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.3.min.js": "89bArO+nlbP3sgakeHjCo1JYxYR5wufVgA3IbUvDY+K7w4zyxJqssu7wVnfeKCq8"};
    
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var element = document.createElement('script');
          element.onload = on_load;
          element.onerror = on_error;
          element.async = false;
          element.src = url;
          if (url in hashes) {
            element.crossOrigin = "anonymous";
            element.integrity = "sha384-" + hashes[url];
          }
          console.debug("Bokeh: injecting script tag for BokehJS library: ", url);
          document.head.appendChild(element);
        }
      };
    
      function inject_raw_css(css) {
        const element = document.createElement("style");
        element.appendChild(document.createTextNode(css));
        document.body.appendChild(element);
      }
    
      
      var js_urls = ["https://cdn.bokeh.org/bokeh/release/bokeh-2.2.3.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.3.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.3.min.js"];
      var css_urls = [];
      
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                (function(root) {
                  function embed_document(root) {
                    
                  var docs_json = '{"40eba20c-6fe7-49f6-b378-9e7d108ef6b7":{"roots":{"references":[{"attributes":{"line_alpha":{"value":0.8},"line_color":{"field":"colors"},"xs":{"field":"xs"},"ys":{"field":"ys"}},"id":"2394","type":"MultiLine"},{"attributes":{"line_alpha":{"value":0.8},"line_color":{"field":"colors"},"xs":{"field":"xs"},"ys":{"field":"zs"}},"id":"2400","type":"MultiLine"},{"attributes":{"line_width":{"value":3},"xs":{"field":"xs"},"ys":{"field":"ys"}},"id":"2395","type":"MultiLine"},{"attributes":{"source":{"id":"2323"}},"id":"2397","type":"CDSView"},{"attributes":{"args":{"s1":{"id":"2323"},"xy_names":["xs","zs"]},"code":"\\n// box selet callback for both plots\\n// args:\\n// s1 = column data source\\n// xy_names = which column is plotted on x and y axis of current plot\\n// cb_obj = provided by bokeh showing selected box extent\\n\\nconst x0 = cb_obj[&#x27;geometry&#x27;][&#x27;x0&#x27;]\\nconst x1 = cb_obj[&#x27;geometry&#x27;][&#x27;x1&#x27;]\\nconst y0 = cb_obj[&#x27;geometry&#x27;][&#x27;y0&#x27;]\\nconst y1 = cb_obj[&#x27;geometry&#x27;][&#x27;y1&#x27;]\\nconst xs = s1.data[xy_names[0]]\\nconst ys = s1.data[xy_names[1]]\\n\\nvar new_selection = []\\n\\n// for each line\\nfor (var j=0;j&lt;xs.length;j+=1) {\\n    \\n    // grab the points in line j\\n    const xj = xs[j]\\n    const yj = ys[j]\\n    \\n    // if one point in the line is in the selection\\n    // box select that line\\n    \\n    for (var jj=0;jj&lt;xj.length;jj+=1) {\\n        const xjj = xj[jj]\\n        const yjj = yj[jj]\\n    \\n        if ((xjj &gt;= x0) &amp;&amp; (xjj &lt;= x1) &amp;&amp; (yjj &gt;= y0) &amp;&amp; (yjj &lt;= y1)) {\\n            new_selection.push(j)\\n            break \\n        }\\n        \\n        // lines are in sorted-by-x order, no need to search past end of the box\\n        else if (xjj &gt; x1) {\\n            break\\n        }\\n    }\\n}\\n\\n// update s1 with selection\\ns1.selected[&#x27;indices&#x27;] = new_selection\\ns1.change.emit()\\n"},"id":"2405","type":"CustomJS"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"2349","type":"BoxAnnotation"},{"attributes":{"line_color":{"field":"colors"},"line_width":{"value":3},"xs":{"field":"xs"},"ys":{"field":"zs"}},"id":"2399","type":"MultiLine"},{"attributes":{"children":[{"id":"2431"},{"id":"2429"}],"sizing_mode":"scale_both"},"id":"2432","type":"Column"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"2350","type":"BoxAnnotation"},{"attributes":{"line_width":{"value":3},"xs":{"field":"xs"},"ys":{"field":"zs"}},"id":"2401","type":"MultiLine"},{"attributes":{"source":{"id":"2323"}},"id":"2403","type":"CDSView"},{"attributes":{"args":{"s1":{"id":"2323"}},"code":"\\n// button select callback changes the color of the selected\\n// lines from whatever they are to &#x27;cyan&#x27;\\n// args = s1 = column data source\\n    const selection = s1.selected[&#x27;indices&#x27;]\\n    \\n    if (selection.length == 0) {\\n        alert(\\"No line selected\\")\\n    \\n    }\\n    \\n    for (var j = 0; j &lt; selection.length; j+= 1) {\\n        s1.data[&#x27;colors&#x27;][selection[j]] = &#x27;cyan&#x27;\\n    }\\n    s1.selected[&#x27;indices&#x27;] = []\\n    s1.change.emit()\\n"},"id":"2408","type":"CustomJS"},{"attributes":{"args":{"s1":{"id":"2323"},"xy_names":["xs","ys"]},"code":"\\n// box selet callback for both plots\\n// args:\\n// s1 = column data source\\n// xy_names = which column is plotted on x and y axis of current plot\\n// cb_obj = provided by bokeh showing selected box extent\\n\\nconst x0 = cb_obj[&#x27;geometry&#x27;][&#x27;x0&#x27;]\\nconst x1 = cb_obj[&#x27;geometry&#x27;][&#x27;x1&#x27;]\\nconst y0 = cb_obj[&#x27;geometry&#x27;][&#x27;y0&#x27;]\\nconst y1 = cb_obj[&#x27;geometry&#x27;][&#x27;y1&#x27;]\\nconst xs = s1.data[xy_names[0]]\\nconst ys = s1.data[xy_names[1]]\\n\\nvar new_selection = []\\n\\n// for each line\\nfor (var j=0;j&lt;xs.length;j+=1) {\\n    \\n    // grab the points in line j\\n    const xj = xs[j]\\n    const yj = ys[j]\\n    \\n    // if one point in the line is in the selection\\n    // box select that line\\n    \\n    for (var jj=0;jj&lt;xj.length;jj+=1) {\\n        const xjj = xj[jj]\\n        const yjj = yj[jj]\\n    \\n        if ((xjj &gt;= x0) &amp;&amp; (xjj &lt;= x1) &amp;&amp; (yjj &gt;= y0) &amp;&amp; (yjj &lt;= y1)) {\\n            new_selection.push(j)\\n            break \\n        }\\n        \\n        // lines are in sorted-by-x order, no need to search past end of the box\\n        else if (xjj &gt; x1) {\\n            break\\n        }\\n    }\\n}\\n\\n// update s1 with selection\\ns1.selected[&#x27;indices&#x27;] = new_selection\\ns1.change.emit()\\n"},"id":"2404","type":"CustomJS"},{"attributes":{"args":{"s1":{"id":"2323"}},"code":"\\n// reset callback restores original colors and \\n// clears the selection\\n// args = s1 = column data source\\ns1.data[&#x27;colors&#x27;] = [&#x27;#7F3C8D&#x27;, &#x27;#11A579&#x27;, &#x27;#3969AC&#x27;, &#x27;#F2B701&#x27;, &#x27;#E73F74&#x27;, &#x27;#80BA5A&#x27;, &#x27;#E68310&#x27;, &#x27;#008695&#x27;]\\ns1.selected[&#x27;indices&#x27;] = []\\ns1.change.emit()"},"id":"2406","type":"CustomJS"},{"attributes":{"icon":null,"js_event_callbacks":{"button_click":[{"id":"2408"}]},"label":"Change the color!"},"id":"2407","type":"Button"},{"attributes":{"below":[{"id":"2369"}],"center":[{"id":"2372"},{"id":"2376"}],"js_event_callbacks":{"reset":[{"id":"2406"}],"selectiongeometry":[{"id":"2405"}]},"left":[{"id":"2373"}],"plot_height":400,"plot_width":400,"renderers":[{"id":"2402"}],"sizing_mode":"scale_both","title":{"id":"2359"},"toolbar":{"id":"2385"},"toolbar_location":null,"x_range":{"id":"2361"},"x_scale":{"id":"2365"},"y_range":{"id":"2363"},"y_scale":{"id":"2367"}},"id":"2358","subtype":"Figure","type":"Plot"},{"attributes":{"toolbar":{"id":"2430"},"toolbar_location":"above"},"id":"2431","type":"ToolbarBox"},{"attributes":{"children":[{"id":"2432"},{"id":"2407"}]},"id":"2433","type":"Column"},{"attributes":{"data":{"colors":["#7F3C8D","#11A579","#3969AC","#F2B701","#E73F74","#80BA5A","#E68310","#008695"],"line_id":[0,1,2,3,4,5,6,7],"xs":[[0,1,2,3,4,5,6,7,8,9,10,11],[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10,11,12],[9,10,11,12,13,14,15,16,17,18,19],[9,10,11,12,13,14,15],[4,5,6,7,8,9,10,11,12,13,14,15],[4,5,6,7,8,9,10,11,12],[5,6,7,8,9,10,11,12,13,14]],"ys":[[2.2276472942075305,2.0281066366201217,1.3084461175404614,1.5242661503827566,2.2432207466706267,1.338241974675688,2.0910621688222504,1.0788030092723047,2.686633849203915,1.118123533798827,2.6898455373690933,2.1554951340042656],[2.1938397393588955,2.915556280275568,2.2996235616801632,2.997692781952728,2.9251775646138993,2.454084206098525,2.7994893408351356,2.2639694434463156,2.3319655694569654,2.3179135172945036],[2.7532617484738715,3.287084751018809,2.0570214108875144,2.854440234553427,3.430700201876311,3.6936281892736194,2.6021123972191686,3.291732309373497,3.339085438699141,2.0091399823685325,2.4958398344725827,2.9553481315031314],[1.0296058586937022,0.6473442619090755,1.0812338862272053,1.0995211826138627,1.0365286596158716,1.2682945881371226,1.729738864462175,0.29727093372983293,1.7263691652767092,1.8960641619858376,0.6891792400193135],[0.795710323367983,0.5841422687733655,0.8903783174052199,0.17250103851601795,0.7272223407049739,0.6758341050732266,0.6100146464961539],[2.8620309970176425,2.256712377410693,3.6839782028615735,3.81979606501001,3.0915942382875317,3.3652833695594584,2.7001838604827415,2.6260292511710284,2.6602918357250918,2.432200890686092,3.1220378590782825,2.6558827756280943],[1.716459951442835,1.0974520627629956,0.28547254883054674,0.13028271616209008,1.4049399776885139,1.2290361071980735,1.240117923912254,0.2389933732978755,0.44898367583860765],[1.1447841511218253,1.0186196517505912,1.0973621248755934,1.8276963099552788,0.9453989563285294,0.03738633658759882,0.13748931063987158,0.4713584072230921,1.4008606061875224,1.897225064402342]],"zs":[[1.1290616131328366,2.113128169143572,2.4933825438514043,2.7964951455502938,1.1756604619022657,2.639512993229048,1.9011794329084848,2.8697150915417975,2.580934314121096,1.168271125298849,2.3861037799162617,1.8662834358395313],[1.8069945407647656,0.6838801077771626,1.8652540335198304,1.4281084636439711,1.1062897442450743,1.4062622545123369,1.395478536218873,1.4700971858496539,0.6238832261248413,1.8032644918261016],[3.488464641502014,3.1492571011479717,2.951493658910307,2.278370555885954,3.2120248351230516,2.8594428783123664,2.812420773787083,2.7695433218438232,2.916856539224887,3.686937597145784,3.8719370396040667,3.002563236690298],[3.1893048574346095,3.5933763489620465,3.3992282376414287,2.103303336809505,2.3039904023494344,3.8709353249779244,3.5502620467719863,3.323664558743319,2.552737999115031,3.824498406629049,2.047141639412458],[2.0403608190094094,2.4621835159742385,2.0167573252204063,2.8296600869812694,2.8442270817468245,2.8669396754522323,2.533736770785894],[2.3456429955211062,3.418796918408612,2.9330010757183116,3.3572022527647754,3.0298019760717008,2.2192623455738536,2.0873296984939955,2.9812613069112994,2.3276272465008807,2.3861505546765747,3.377960889673711,3.8478492750594366],[0.7786866853521981,0.008442846229295475,0.20998353267470804,0.4967329072834503,0.470003969467896,0.5786448919737038,0.6477860925725412,0.42771418746344314,0.78922794136205],[1.5286953807375732,1.8648978487708172,1.2870170201009312,1.0920820396208724,2.104910970248661,1.1205419594846395,2.3998882372496197,1.2897108837086486,1.1974801197095621,1.207067705752792]]},"selected":{"id":"2415"},"selection_policy":{"id":"2414"}},"id":"2323","type":"ColumnDataSource"},{"attributes":{"text":"XZ view"},"id":"2359","type":"Title"},{"attributes":{},"id":"2370","type":"BasicTicker"},{"attributes":{},"id":"2361","type":"DataRange1d"},{"attributes":{},"id":"2420","type":"BasicTickFormatter"},{"attributes":{"axis_label":"The mysterious X","formatter":{"id":"2420"},"ticker":{"id":"2370"}},"id":"2369","type":"LinearAxis"},{"attributes":{"axis_label":"The parameter Z","formatter":{"id":"2422"},"ticker":{"id":"2374"}},"id":"2373","type":"LinearAxis"},{"attributes":{},"id":"2367","type":"LinearScale"},{"attributes":{},"id":"2422","type":"BasicTickFormatter"},{"attributes":{},"id":"2363","type":"DataRange1d"},{"attributes":{},"id":"2365","type":"LinearScale"},{"attributes":{"axis":{"id":"2369"},"ticker":null},"id":"2372","type":"Grid"},{"attributes":{"axis":{"id":"2373"},"dimension":1,"ticker":null},"id":"2376","type":"Grid"},{"attributes":{},"id":"2374","type":"BasicTicker"},{"attributes":{"text":"XY view"},"id":"2325","type":"Title"},{"attributes":{"overlay":{"id":"2383"}},"id":"2377","type":"BoxSelectTool"},{"attributes":{},"id":"2327","type":"DataRange1d"},{"attributes":{"axis_label":"The mysterious X","formatter":{"id":"2410"},"ticker":{"id":"2336"}},"id":"2335","type":"LinearAxis"},{"attributes":{"data_source":{"id":"2323"},"glyph":{"id":"2393"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"2394"},"selection_glyph":{"id":"2395"},"view":{"id":"2397"}},"id":"2396","type":"GlyphRenderer"},{"attributes":{"below":[{"id":"2335"}],"center":[{"id":"2338"},{"id":"2342"}],"js_event_callbacks":{"reset":[{"id":"2406"}],"selectiongeometry":[{"id":"2404"}]},"left":[{"id":"2339"}],"plot_height":400,"plot_width":400,"renderers":[{"id":"2396"}],"sizing_mode":"scale_both","title":{"id":"2325"},"toolbar":{"id":"2351"},"toolbar_location":null,"x_range":{"id":"2327"},"x_scale":{"id":"2331"},"y_range":{"id":"2329"},"y_scale":{"id":"2333"}},"id":"2324","subtype":"Figure","type":"Plot"},{"attributes":{},"id":"2336","type":"BasicTicker"},{"attributes":{"axis_label":"The variable Y","formatter":{"id":"2412"},"ticker":{"id":"2340"}},"id":"2339","type":"LinearAxis"},{"attributes":{},"id":"2333","type":"LinearScale"},{"attributes":{},"id":"2329","type":"DataRange1d"},{"attributes":{},"id":"2410","type":"BasicTickFormatter"},{"attributes":{},"id":"2331","type":"LinearScale"},{"attributes":{"axis":{"id":"2335"},"ticker":null},"id":"2338","type":"Grid"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"2383","type":"BoxAnnotation"},{"attributes":{"data_source":{"id":"2323"},"glyph":{"id":"2399"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"2400"},"selection_glyph":{"id":"2401"},"view":{"id":"2403"}},"id":"2402","type":"GlyphRenderer"},{"attributes":{},"id":"2412","type":"BasicTickFormatter"},{"attributes":{"axis":{"id":"2339"},"dimension":1,"ticker":null},"id":"2342","type":"Grid"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"2384","type":"BoxAnnotation"},{"attributes":{},"id":"2340","type":"BasicTicker"},{"attributes":{},"id":"2345","type":"WheelZoomTool"},{"attributes":{"overlay":{"id":"2350"}},"id":"2344","type":"BoxZoomTool"},{"attributes":{},"id":"2414","type":"UnionRenderers"},{"attributes":{"overlay":{"id":"2349"}},"id":"2343","type":"BoxSelectTool"},{"attributes":{},"id":"2415","type":"Selection"},{"attributes":{"active_drag":"auto","active_inspect":"auto","active_multi":null,"active_scroll":"auto","active_tap":"auto","tools":[{"id":"2343"},{"id":"2344"},{"id":"2345"},{"id":"2346"},{"id":"2347"},{"id":"2348"}]},"id":"2351","type":"Toolbar"},{"attributes":{},"id":"2346","type":"PanTool"},{"attributes":{},"id":"2347","type":"SaveTool"},{"attributes":{},"id":"2348","type":"ResetTool"},{"attributes":{"toolbars":[{"id":"2351"},{"id":"2385"}],"tools":[{"id":"2343"},{"id":"2344"},{"id":"2345"},{"id":"2346"},{"id":"2347"},{"id":"2348"},{"id":"2377"},{"id":"2378"},{"id":"2379"},{"id":"2380"},{"id":"2381"},{"id":"2382"}]},"id":"2430","type":"ProxyToolbar"},{"attributes":{},"id":"2382","type":"ResetTool"},{"attributes":{"line_color":{"field":"colors"},"line_width":{"value":3},"xs":{"field":"xs"},"ys":{"field":"ys"}},"id":"2393","type":"MultiLine"},{"attributes":{"active_drag":"auto","active_inspect":"auto","active_multi":null,"active_scroll":"auto","active_tap":"auto","tools":[{"id":"2377"},{"id":"2378"},{"id":"2379"},{"id":"2380"},{"id":"2381"},{"id":"2382"}]},"id":"2385","type":"Toolbar"},{"attributes":{},"id":"2380","type":"PanTool"},{"attributes":{"children":[[{"id":"2324"},0,0],[{"id":"2358"},0,1]]},"id":"2429","type":"GridBox"},{"attributes":{},"id":"2381","type":"SaveTool"},{"attributes":{},"id":"2379","type":"WheelZoomTool"},{"attributes":{"overlay":{"id":"2384"}},"id":"2378","type":"BoxZoomTool"}],"root_ids":["2433"]},"title":"Bokeh Application","version":"2.2.3"}}';
                  var render_items = [{"docid":"40eba20c-6fe7-49f6-b378-9e7d108ef6b7","root_ids":["2433"],"roots":{"2433":"8fec577e-a21e-4bd6-883a-fdf14f269da6"}}];
                  root.Bokeh.embed.embed_items(docs_json, render_items);
                
                  }
                  if (root.Bokeh !== undefined) {
                    embed_document(root);
                  } else {
                    var attempts = 0;
                    var timer = setInterval(function(root) {
                      if (root.Bokeh !== undefined) {
                        clearInterval(timer);
                        embed_document(root);
                      } else {
                        attempts++;
                        if (attempts > 100) {
                          clearInterval(timer);
                          console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                        }
                      }
                    }, 10, root)
                  }
                })(window);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
        
        
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i].call(root, root.Bokeh);
        }
        
      }
    
      if (root._bokeh_is_loading === 0) {
        console.debug("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(css_urls, js_urls, function() {
          console.debug("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(window));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();