module Jekyll
  module Tags
    class TwoColumn < Liquid::Block
      def initialize(tag_name, block_options, liquid_options)
        super
      end

      def render(context)
        context.stack do
          @content = super
        end
        output = %(<div class="container">#{@content}</div>)

        output
      end
    end
  end
end

Liquid::Template.register_tag('twocolumn', Jekyll::Tags::TwoColumn)
