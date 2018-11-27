/*Created 2015-08-26  by Andy*/


function check_email (id){
    var email = $("#"+id).val();
    if( !validateEmail(email)) {
        return false
    } else {
        return true
    }
}

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( $email ) ) {
        return false;
    } else {
        return true;
    }
}
    
function map_pin(value) {
    map.marksHide();
    value = value.split('/')
    if (value[0] != null) {
        drop_pin(value[0]);    
    }
}

function drop_pin(id) {
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"])
    var width = parseInt(coords["width"])
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) /2);
    
    map.setMarks([
        { 
            xy: [coords["x"] - 15 + x_offset, coords["y"] - 55 + y_offset],
            attrs: { src:  '//codecloud.cdn.speedyrails.net/sites/57f5246e6e6f644418020000/image/png/1446761110000/pin.png' }
        }
    ]);
}

// $("#close_form").click(function() {
//     close_form();
// });

function close_form(){
    $(".newsletter_container").fadeOut();
    $(".newsletter_overlay").fadeOut()
    $("#fieldEmail").val("");
    $("#desktop_email").val("");
    $("#mobile_email").val("");
}

function load_slider(slider){
    $('.' + slider).flexslider({
        animation: "slide",
        controlNav: true,
        directionNav: true,    
        animationLoop: true,
        slideshow: true,
        minItems: 3,
        maxItems: 3,
        prevText: "",
        nextText: ""
    });
}

function get_date_string(start_date, end_date) {
    var start = moment(start_date).tz(getPropertyTimeZone());
    var end = moment(end_date).tz(getPropertyTimeZone());
    if (start.format("DMY") == end.format("DMY")) {
        date_string = start.format("MMM D");
    } else {
        date_string = start.format("MMM D") + " - " + end.format("MMM D");
    }
    return date_string
}

function show_results(id) {
    if ($("#" + id + "_results").is(":visible")) {
        $("#" + id + "_results").slideUp();
        $("#" + id + "_arrow").removeClass("fa-chevron-down", 1000);
        $("#" + id + "_arrow").addClass("fa-chevron-right", 1000);
    } else {
        $(".results_div").slideUp();
        $(".search_arrow").removeClass("fa-chevron-down", 1000);
        $(".search_arrow").addClass("fa-chevron-right", 1000);
        $("#" + id + "_results").slideDown();   
        $("#" + id + "_arrow").removeClass("fa-chevron-right", 1000);
        $("#" + id + "_arrow").addClass("fa-chevron-down", 1000);
    }
}

function showSearchResults(){
        $('#search_results').show();
        if($('#search_input').val().length === 0){
            $('#search_results').hide();
        }else{
            var search_results = getSearchResults($('#search_input').val(),10,100);
            $('.search-results-count').html("Total Results : "+search_results.summary.count);
            renderSearchResultsTemplate('#search_results_template','#search_results_items',search_results);
            if (search_results["stores"]){
                if (search_results["stores"].length > 0){
                    $("#store_results_header").html(search_results["stores"].length+" Stores <i id='store_arrow' class='fa fa-chevron-right pull-right search_arrow'></i>") ;
                    $("#store_results_header").show();
                }
                
            } else {
                $("#store_results_header").hide();
            }
            if (search_results["promotions"]){
                if (search_results["promotions"].length > 0){
                    $("#promotions_results_header").html(search_results["promotions"].length+" Promotions <i id='promo_arrow' class='fa fa-chevron-right search_arrow pull-right'></i>")    ;
                    $("#promotions_results_header").show();
                }
                
            } else {
                $("#promotions_results_header").hide();
            }
            if (search_results["events"]){
                if (search_results["events"].length > 0) {
                    $("#events_results_header").html(search_results["events"].length+" Events <i id='event_arrow' class='fa fa-chevron-right pull-right search_arrow'></i>")    
                    $("#events_results_header").show();
                }
                
            } else {
                $("#events_results_header").hide();
            }
            // $(document).i18n();
        }
    }
    
    
    $('.close-search').click(function(){
        $('#search_results').hide();
    });
    
    
function toggle_mobile_menu(){
    if ($(".mobile_menu").is(":visible")){
        $(".mobile_menu").slideUp();
    } else {
        $(".mobile_menu").slideDown();
    }
}    

function get_month (id){
    switch(id) {
        case 0:
            month = "Jan"
            break;
        case 1:
            month = "Feb"
            break;
        case 2:
            month = "Mar"
            break;
        case 3:
            month = "Apr"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "Jun"
            break;
        case 6:
            month = "Jul"
            break;
        case 7:
            month = "Aug"
            break;
        case 8:
            month = "Sep"
            break;
        case 9:
            month = "Oct"
            break;
        case 10:
            month = "Nov"
            break;
        case 11:
            month = "Dec"
            break;
            
    }
    return month;
}

function get_hour_string(day_of_week, open_time, close_time, is_closed){
    switch(day_of_week) {
        case 7:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
        
    }
    var open_time = moment(open_time).tz(getPropertyTimeZone()).format("h:mm A");
    var close_time = moment(close_time).tz(getPropertyTimeZone()).format("h:mm A");
    
   
    hour_string = {};
    hour_string["day"] = day
    if (is_closed == true){
        hour_string["detail"] = "Closed"
    } else {
        hour_string["detail"] = open_time + " - " + close_time
    }
    return hour_string;
}

function renderPageData(container, template, collection, type) {
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    
    if (type == 'property' || type == 'store_details' || type=='promo_details') {
        item_list.push(collection);    
    } else {
        item_list = collection;
    }
            
    $.each(item_list, function(key, val) {
        if (val.description) {
            val.description_short = val.description.substring(0,150);
            if (val.description.length > 150) {
                val.description_short += "...";
            }
        }
        var rendered = Mustache.render(template_html,val);
        if (type == 'right_block') {
            if (key <= 1) {
                item_rendered.push(rendered);    
            }
        } else if (type == 'bottom_block') {
            if (key >= 2){
                item_rendered.push(rendered);    
            }
        } else {
            item_rendered.push(rendered);    
        }
    });
        
    $(container).show();
    $(container).html(item_rendered.join(''));
    
    if (type == 'directory') {
        $(container).hide();
    }
}

function toggle_menu(id) {
    if ($("#" + id).is(":visible")){
        $("#" + id).slideUp();
    } else {
        $(".submenu").slideUp();
        $(".mobile_submenu").slideUp();
        $("#" + id).slideDown();
    }
}

function toggle_mobile_submenu(id) {
    if ($("#" + id).is(":visible")) {
        $("#" + id).slideUp();
        $("#" + id + "_icon").addClass("fa-plus");
        $("#" + id + "_icon").removeClass("fa-minus");
    } else {
        $(".mobile_submenu").slideUp();
        $(".mobile_menu_ul li button i").removeClass("fa-minus");
        $(".mobile_menu_ul li button i").addClass("fa-plus");
        $("#" + id).slideDown();
        $("#" + id + "_icon").removeClass("fa-plus");
        $("#" + id + "_icon").addClass("fa-minus");
    }
}

function toggle_search(){
   if ($(".hidden_search").is(":visible")) {
       $(".hidden_search").slideUp();
       $(".visible_icons").slideDown();
   } else {
       $(".hidden_search").slideDown();
       $(".visible_icons").slideUp();
   }
}

$(document).click(function(event) { 
    if (!$(event.target).closest('.desktop_menu_ul li button').length) {
        if ($('.submenu').is(":visible")) {
            $('.submenu').slideUp()
        }
    }        
});

function renderPosts(container, template, collection) {
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each(collection, function(key, val) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/59c082786e6f6462ee1d0000/image/png/1507232968000/Group 10.png";
        } else {
            val.post_image = val.image_url;
        }
        
        if (val.title.length > 35) {
            val.title_short = val.title.substring(0, 35) + "...";
        } else {
            val.title_short = val.title;
        }
        
        if (val.body.length > 90) {
            val.description_short = val.body.substring(0, 90) + "...";
        } else {
            val.description_short = val.body;
        }
        
        val.description_short = val.description_short.replace("&amp;", "&");
        
        var published_on = moment(val.publish_date).tz(getPropertyTimeZone());
        val.publish_date = published_on.format("MMM D, YYYY");
        
        // no_padding class 
        if ((counter%3) === 0) {
            val.padding_class = "no_padding_right"
        } else {
            val.padding_class = ""
        }
        
        val.counter = counter;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter + 1;
    });
    $(container).html(item_rendered.join(''));
}

function renderSinglePost(container, template, main_post) {
    var item_list = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    if (main_post.image_url.indexOf('missing.png') > 0) {
        main_post.post_image = "//codecloud.cdn.speedyrails.net/sites/59282acb6e6f647d8d520100/image/jpeg/1502470554000/EventsPlaceholder@2x.jpg";
    } else {
        main_post.post_image = main_post.image_url;
    }
    
    if (main_post.title.length > 45) {
        main_post.title_short = main_post.title.substring(0, 44) + "...";
    } else {
        main_post.title_short = main_post.title;
    }
        
    if (main_post.body.length > 175) {
        main_post.description_short = main_post.body.substring(0,175) + "...";
    } else {
        main_post.description_short = main_post.body;
    }
    
    main_post.description_short = main_post.description_short.replace("&amp;", "&");
    main_post.slug = "posts/" + main_post.slug;
    main_post.twitter_title = main_post.title + " via @Heartland_TC";
    
    var published_on = moment(main_post.publish_date).tz(getPropertyTimeZone());
    main_post.publish_date = published_on.format("MMM D, YYYY");
        
    var rendered = Mustache.render(template_html, main_post);
    item_list.push(rendered);
    $(container).html(item_list.join(''));
}

function load_more(num) {
    var n = parseInt(num);
    for (i = n; i < n + 6; i++) {
        var id = i.toString();
        $('#show_' + id ).fadeIn();
    }
    var posts = getBlogDataBySlug("htc-htc-blog").posts;
    var total_posts = posts.length;
    if (i >= total_posts) {
        $('#loaded_posts').fadeOut();
        $('#all_loaded').show().css('display', 'inline-block');
    }
    $('#num_loaded').val(i);
}

function get_instagram(url, total, size, callback) {
    console.log("hello")
    var html = '<div class="col-md-4 col-sm-6 col-xs-6 no_padding_left"><a href="{{link}}" target="_blank"><div style="background-image:url({{image}})" class="blog_image_div"></div><h4 class="blog_title">{{caption}}</h4></a></div>';
    console.log(html)
    var item_rendered = [];
    Mustache.parse(html); 
    log('fetching instagram data from: ' + url);
    $.getJSON(url).done(function(data) {
        var insta_feed = data.social.instagram;
        if (insta_feed != null) {
            main_feed = insta_feed.splice(0, total);
            $.each(main_feed, function(i,v) {
                var feed_obj = {};
                feed_obj.image = v.images[size].url;
                feed_obj.link = v.link;
                if (v.caption.text.length > 30) {
                    feed_obj.caption = v.caption.text.substring(0, 30) + "...";
                } else {
                    feed_obj.caption = v.caption.text;
                }
                if (i < total) {
                    var ig_rendered =  Mustache.render(html,feed_obj);
                    item_rendered.push(ig_rendered.trim());
                }
            });
            callback(item_rendered.join(''));
        }
    });
}

function render_instagram(data) {
    $('#instafeed').html(data);
}

function getAssetURL(id) {
    var store_id = id;
    var store_assets = "https://northside.mallmaverick.com/api/v4/northside/stores/" + store_id + "/store_files.json"
    var store_front_image_url = "";    
    $.ajax({
        url: store_assets,
        dataType: 'json',
        async: false,
        success: function(data) {
            if(data.store_files.length > 0) {
                store_front_image_url = data.store_files[0].url;
            }
        },
        error: function (data){
            store_front_image_url = "";
        }
    });
    return store_front_image_url;
}

function renderFeatureItems(){
    var items = getFeatureList().slice(2);
    $.each(items, function(i, val) {
        $('.feature_' + i).html('<div class="ih-item circle effect19"><a href="' + val.url + '"><img src="' + val.image_url + '"alt="' + val.name + '"><div class="info"><div class="content"><h3> '+ val.name +'</h3></div></div></a></div>');
    });
}

function renderPostDetails(container, template, collection, blog_posts){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    $.each(collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/59282acb6e6f647d8d520100/image/jpeg/1502470554000/EventsPlaceholder@2x.jpg";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.body.length > 100){
            val.description_short = val.body.substring(0,100) + "...";
        } else {
            val.description_short = val.body;
        }
        
        var published_on = moment(val.publish_date).tz(getPropertyTimeZone());
        val.publish_date = published_on.format("MMM D, YYYY");
        
        var blog_list = [];
        $.each(blog_posts, function(key, val) {
            var slug = val.slug;
            blog_list.push(val.slug);
        });
        var current_slug = val.slug;
        var index = blog_list.indexOf(current_slug);
        if(index >= 0 && index < blog_list.length){
          var next_slug = blog_list[index + 1];
            if(next_slug != undefined || next_slug != null){
                val.next_post = "/posts/" + next_slug;
                val.next_show = "display: block";
            } else {
                val.next_show = "display: none";
            }
        }
        if(index >= 0 && index < blog_list.length){
            var prev_slug = blog_list[index - 1];
            if(prev_slug != undefined || prev_slug != null){
                val.prev_post = "/posts/" + prev_slug;
                val.prev_show = "display: block";
            } else {
                val.prev_show = "display: none";
            }
        }

        val.twitter_title = val.title + " via @ShopTheGateway";
        console.log(val);
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).html(item_rendered.join(''));
}