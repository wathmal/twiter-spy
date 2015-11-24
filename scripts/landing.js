/**
 * Created by wathmal on 11/1/15.
 */

var CarouselItem= React.createClass({
    render: function(){



        return(
            <div className={this.props.cssClass}>
                <h1>{this.props.amount}</h1>
                <h5>{this.props.description}</h5>
            </div>

        );
    }

});

var CarouselList= React.createClass({
   render: function(){
       var index= 0;
       // falcor path
       //console.log(this.props.stats);


       var stats= this.props.stats.map(function(stat){
           var cssClass= "item text-center";
           if(index == 0){
               cssClass= cssClass + " active";
               index++;
           }
           return(<CarouselItem cssClass={cssClass} amount={stat.amount} description={stat.description}></CarouselItem>);
       });

       return (
           <div className="carousel-inner" role="listbox">
               {stats}
           </div>
       );
   }

});



var StatsCarousel= React.createClass({
    getInitialState: function(){
        // falcor data model template for stats
        return {stats: []};
    },

    loadStats: function(){

        // the falcor way

        var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json')});

        model
            // atomic fields don't need to specify fields
            //.get(["statistics", {from: 0, to: 10}, ["description", "amount"]])
            .get(["statistics"])
            // don't use a function inside :)
            // use response => this.setState({stats: response})
            .then(response => this.setState({stats: response.json.statistics}));
            //.then(responce => console.log(responce));

        // jquery way

        /*$.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                // set state
                //console.log(data);
                this.setState({stats: data});


            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });*/
    },

    componentDidMount: function(){
        this.loadStats();
        //console.log(this.state.stats);
    },

    render: function(){

        return (

            <div className="statsCarousel carousel slide" data-ride="carousel" id="mycarousel">




                <CarouselList stats={this.state.stats}/>


                <a className="left carousel-control" href="#mycarousel" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">previous</span>
                </a>

                <a className="right carousel-control" href="#mycarousel" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">next</span>
                </a>


            </div>
        );
    }

});

ReactDOM.render(
    <StatsCarousel url="http://localhost:3001/stats"/>,
    document.getElementById('container')


);