Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
Ext.gesture.Manager.onMouseEvent = function(e) {
    var target = e.target;

    while (target) {
        if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
            return;
        }

        target = target.parentNode;
    }

    this.onMouseEventOld.apply(this, arguments);
};

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,

    onReady: function() {


       var mapobj;
       var testlat;
       var testlng;
       var testidx;
       
	       var markersArray = new Array();
	       var contentString = new Array();
	       var infowindow = new Array();
                    var infoctr = 0;
       

       
                    var Arr1 = new Array();
                    var Arr2 = new Array();
                    Arr1 = [{text:' ',value:'nothing'}];
                    var store = new Ext.data.SimpleStore({
		         fields:['text', 'value']
		        ,data:Arr1
		        
			});  
        var makeJSONPRequest = function() {
            Ext.getBody().mask('Loading...', 'x-mask-loading', false);
            Ext.util.JSONP.request({
                url: 'http://api.groupon.com/v2/divisions',
                callbackKey: 'callback',
                params: {
                   client_id : 'INCLUDE YOUR GROUPON.COM API KEY HERE' 
                },
                callback: function(result) {
                    var grpndeals = result;
                    for (i=0;i<grpndeals.divisions.length;i++) {
                          Arr1.push({text:grpndeals.divisions[i].name,value:grpndeals.divisions[i].id,lat:grpndeals.divisions[i].lat,lng:grpndeals.divisions[i].lng});
                    }
                    store.loadData(Arr1);
                    Ext.getBody().unmask();
                }
            });
        };







	var HomeControl = function (controlDiv, map) {

	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map
	  controlDiv.style.padding = '5px';

	  // Set CSS for the control border
	  var controlUI = document.createElement('DIV');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '2px';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set the map to Home';
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control interior
	  var controlText = document.createElement('DIV');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = "<img src='powered_by_groupon_small.png' height=31 width=102.4 />";
	  controlUI.appendChild(controlText);

	};














        
        var position = new google.maps.LatLng(38,-97),  //Center of the USA
                //Tracking Marker Image
                image = new google.maps.MarkerImage(
                    'point.png',
                    new google.maps.Size(32, 31),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16, 31)
                  );
         var  shadow = new google.maps.MarkerImage(
                    'shadow.png',
                    new google.maps.Size(64, 52),
                    new google.maps.Point(0,0),
                    new google.maps.Point(-5, 42)
                  );
        var  map1 = new Ext.Map({ 
            mapOptions : {
                center : new google.maps.LatLng(38, -97),  //Center of the USA
                zoom : 4,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.DEFAULT
                    }
            },


            listeners : {
                maprender : function(comp, map){
                    

                    
                    
                    mapobj = map;
                    
                 // Create the DIV to hold "Powered by Groupon" image

	         var homeControlDiv = document.createElement('DIV');
	         var homeControl = new HomeControl(homeControlDiv, mapobj);
	       
	         homeControlDiv.index = 1;
                mapobj.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);


 	    Ext.getBody().mask('Loading...', 'x-mask-loading', false);

            Ext.util.JSONP.request({
                url: 'http://api.groupon.com/v2/divisions',
                callbackKey: 'callback',
                params: {
                   client_id : 'INCLUDE YOUR GROUPON.COM API KEY HERE'
                },
                callback: function(result) {
                    var grpndeals = result;
                    for (i=0;i<grpndeals.divisions.length;i++) {
                        Arr1.push({text:grpndeals.divisions[i].name,value:grpndeals.divisions[i].id});
                        Arr2.push({text:grpndeals.divisions[i].name,value:grpndeals.divisions[i].id,lat:grpndeals.divisions[i].lat,lng:grpndeals.divisions[i].lng});
                       
                        
                    }
                    store.loadData(Arr1);
                    Ext.getBody().unmask();
                }
            });
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
			
                    setTimeout( function(){ map.panTo (position); } , 1000);
                }

            }

        });












        var makeJSONPRequest1 = function() {



            Ext.getBody().mask('Loading...', 'x-mask-loading', false);

            Ext.util.JSONP.request({
                url: 'http://api.groupon.com/v2/deals',
                callbackKey: 'callback',
                params: {
                   division_id : Arr2[testidx].value,
                   client_id : 'INCLUDE YOUR GROUPON.COM API KEY HERE'
                },
                callback: function(result) {




		  for (i=0;i<markersArray.length;i++) {
		      markersArray[i].setMap(null);
		  }
		    markersArray.length = 0;
		    contentString.length = 0;
		    infowindow.length = 0;

                    var grpndeals = result;

                    for (i=0;i<grpndeals.deals.length;i++) {

                       for (j=0;j<grpndeals.deals[i].options[0].redemptionLocations.length;j++) {
                        position = new google.maps.LatLng(grpndeals.deals[i].options[0].redemptionLocations[j].lat,grpndeals.deals[i].options[0].redemptionLocations[j].lng);
                       
                        markersArray[infoctr] = new google.maps.Marker({
		                                            position: position,
		                                            title : grpndeals.deals[i].title, 
		                                            map: mapobj
             
                                });
                         
                        this.title = "<b> " + grpndeals.deals[i].title + "</b><br>";
                        this.image = "<img src=\"" + grpndeals.deals[i].largeImageUrl + "\" alt=\"Groupon!\"/> ";
                        this.textdesc = "<div>" + grpndeals.deals[i].pitchHtml +  "</div></body></html>" ;
                        this.body = "<html><body background=\"http://assets1.grouponcdn.com/images/groupon/backgrounds/burst_green_rays2.gif?sfjkl0-E\">";



			this.value = "<table > <tr><td><b> Value</b><br>" + 
			"</td> <td><b> Savings</b><br>" +
			"</td> <td><b> Price</b><br></td></tr><tr><td><b> " +
			grpndeals.deals[i].options[0].value.formattedAmount + "</b></td><td><b>\t " +
			grpndeals.deals[i].options[0].discount.formattedAmount + " (" +
			grpndeals.deals[i].options[0].discountPercent + "%)\t " + "</b></td><td><b> " +
			grpndeals.deals[i].options[0].price.formattedAmount +
			"</b></td></tr></table><a href=\"" + grpndeals.deals[i].dealUrl + "/confirmation\">Buy It!</a>";







                        this.title = this.body + this.title + this.image + this.value; // + this.textdesc;

                       contentString[infoctr] = this.title;


                        infowindow[infoctr] = new google.maps.InfoWindow({
			    content: contentString[infoctr]
			});

                        
                         
                        markerload(markersArray[infoctr],infoctr);
                         infoctr++;
                        


                       }

			// load online only deals
                       if (grpndeals.deals[i].options[0].redemptionLocations.length == 0) {
                       
                        position = new google.maps.LatLng(Arr2[testidx].lat,Arr2[testidx].lng);
                       
                        markersArray[infoctr] = new google.maps.Marker({
		                                            position: position,
		                                            title : grpndeals.deals[i].title, 
		                                            map: mapobj
             
                                });
                         
                        this.title = "<b> " + grpndeals.deals[i].title + "</b><br>";
                        this.image = "<img src=\"" + grpndeals.deals[i].largeImageUrl + "\" alt=\"Groupon!\"/> ";
                        this.textdesc = "<div>" + grpndeals.deals[i].pitchHtml +  "</div></body></html>" ;
                        this.body = "<html><body background=\"http://assets1.grouponcdn.com/images/groupon/backgrounds/burst_green_rays2.gif?sfjkl0-E\">";



			this.value = "<table > <tr><td><b> Value</b><br>" + 
			"</td> <td><b> Savings</b><br>" +
			"</td> <td><b> Price</b><br></td></tr><tr><td><b> " +
			grpndeals.deals[i].options[0].value.formattedAmount + "</b></td><td><b>\t " +
			grpndeals.deals[i].options[0].discount.formattedAmount + " (" +
			grpndeals.deals[i].options[0].discountPercent + "%)\t " + "</b></td><td><b> " +
			grpndeals.deals[i].options[0].price.formattedAmount +
			"</b></td></tr></table><a href=\"" + grpndeals.deals[i].dealUrl + "/confirmation\">Buy It!</a>";







                        this.title = this.body + this.title + this.image + this.value; // + this.textdesc;

                       contentString[infoctr] = this.title;


                        infowindow[infoctr] = new google.maps.InfoWindow({
			    content: contentString[infoctr]
			});

                        
                        markerload(markersArray[infoctr],infoctr);
                         infoctr++;



                       
                       }
                       
                        
                    }

                    
                    
                    Ext.getBody().unmask();

                    position = new google.maps.LatLng(Arr2[testidx].lat,Arr2[testidx].lng);
                    setTimeout( function(){ mapobj.panTo (position); mapobj.setZoom(8);} , 1000);

                }
            });
            

        };

        var markerload = function(marker,i) { 
        
                    
                        
			google.maps.event.addListener(marker, 'click', 
			function() { 
			  infowindow[i].open(mapobj,marker);                         
			 }
			 );

        
        };

        







        new Ext.Panel({
           fullscreen: true,
          //  height:600,
          //  width:1024,
            scroll: 'vertical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
            {
               
                xtype: 'selectfield',
                name: 'testfld',
                store: store,
                listeners: {
                change: function(fields,value){
                   
                for(i=0;i<Arr1.length;i++) {
                
                if(Arr2[i].value == value) {
                  
                
                 testlat = Arr2[i].lat;
                 testlng = Arr2[i].lng;
                 testidx = i;
                
                }
                
                
                }
                
                }
                }
            },
            {
                    text: 'Load Deals',
                    handler: makeJSONPRequest1
            }
                ]
            }, map1
            ] 

        });
    }
});