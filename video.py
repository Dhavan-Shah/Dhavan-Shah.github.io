
from manim import (
    Scene, Text, FadeIn, FadeOut, VGroup, Dot, Axes, Create, Line,
    BLUE_C, BLUE_B, YELLOW_E, WHITE,
    RIGHT, LEFT, DOWN, UP, ORIGIN, config, rgb_to_color
)
import numpy as np
import numpy as np

# 16:9, 1080p, dark-blue-black background
config.background_color = rgb_to_color([0/255, 0/255, 28/255])
config.frame_width = 16
config.frame_height = 9
config.pixel_width = 1920
config.pixel_height = 1080
config.frame_rate = 30
PARROT_GREEN = rgb_to_color([22/255, 219/255, 85/255])



class DhavanShowcase(Scene):
    def construct(self):
        # ------------- Title (Foreground) -------------
        title = Text("Dhavan Atul Shah – Data Scientist",
                     font="Montserrat",
                     color=BLUE_C).scale(0.9)
        self.play(FadeIn(title), run_time=1)
        self.wait(0.5)
        self.play(FadeOut(title), run_time=1)

        # ------------- Background charts -------------
        axes = Axes(x_range=[0, 10], y_range=[0, 5],
                    x_length=10, y_length=4,
                    axis_config={"stroke_opacity": 0.2})
        axes.move_to(UP*1.6 + DOWN*1.5)
        # Random time series data
        x_vals = np.linspace(0, 10, 60)
        y_vals = 2 + np.cumsum(np.random.normal(0, 0.2, size=x_vals.shape))
        graph1 = axes.plot_line_graph(x_values=x_vals, y_values=y_vals,
                                      add_vertex_dots=False, line_color=PARROT_GREEN, stroke_opacity=0.5)
        # Second random time series
        x_vals2 = np.linspace(0, 10, 60)
        y_vals2 = 2 + np.cumsum(np.random.normal(0, 0.18, size=x_vals2.shape))
        graph2 = axes.plot_line_graph(x_values=x_vals2, y_values=y_vals2,
                        add_vertex_dots=False, line_color=YELLOW_E, stroke_opacity=0.5)
        self.play(Create(axes), Create(graph1), Create(graph2), run_time=2)

        # ------------- Continue with Bullets and rest of scene -------------

        # ------------- Text bullets -------------
        bullets = [
            "Master’s in Data Science, University of Zurich (Top 100 University)",
            "Kaggle Competition Expert (Top 0.5% Worldwide)",
            "Master’s Project – Deep Isolation Forest (Outlier Detection)",
            "Master’s Thesis – DeepGLO (Time-Series Forecasting)",
            "Experienced in Time-Series Data, GANs and Generative AI"
        ]

        lines = VGroup(*[
            Text("• " + b, font="Lato", color=WHITE).scale(0.55)
            for b in bullets
        ])
        lines.arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(lines[0], shift=UP), run_time=1.2)
        for i in range(1, len(lines)):
            self.play(FadeIn(lines[i], shift=UP), run_time=0.8)


        # ------------- Neural Network Animation (right side, small, fade in/out) -------------
        layers = 5
        nodes_per_layer = [5, 4, 3, 4, 5]
        x_spacing = 1.1  # even smaller spacing
        y_spacing = 0.45
        node_radius = 0.09
        node_groups = []
        all_nodes = []
        # Create nodes in layers
        for l in range(layers):
            group = VGroup()
            for i in range(nodes_per_layer[l]):
                x = -x_spacing * (layers/2 - l - 0.5)
                y = y_spacing * (i - (nodes_per_layer[l]-1)/2)
                node = Dot(point=[x, y, 0], radius=node_radius, color=WHITE)
                group.add(node)
                all_nodes.append(node)
            node_groups.append(group)
        nn_group = VGroup(*[n for g in node_groups for n in g])
        nn_group.move_to(RIGHT*4.8 + UP*2.8)  # position to right and slightly up
        # Create edges between layers
        edges = VGroup()
        for l in range(layers-1):
            for n1 in node_groups[l]:
                for n2 in node_groups[l+1]:
                    edge = Line(n1.get_center(), n2.get_center(), color=BLUE_B, stroke_width=2)
                    edges.add(edge)
        nn_anim_group = VGroup(nn_group, edges)
        nn_anim_group.set_opacity(0)  # start invisible
        self.add(nn_anim_group)

        # Animate node pulsing
        def pulse_nodes(mob, dt):
            t = self.time
            for idx, node in enumerate(all_nodes):
                pulse = 0.04 * np.sin(t*2 + idx)
                node.set_radius(node_radius + pulse)
        nn_group.add_updater(pulse_nodes)

        # Animate edge highlighting
        def animate_edges(mob, dt):
            t = self.time
            for idx, edge in enumerate(edges):
                alpha = 0.3 + 0.5 * np.abs(np.sin(t + idx/7))
                edge.set_opacity(alpha)
        edges.add_updater(animate_edges)

        # Fade in neural network
        self.play(nn_anim_group.animate.set_opacity(0.5), run_time=1)
        self.wait(2)
        # Fade out neural network
        self.play(nn_anim_group.animate.set_opacity(0), run_time=1)
        nn_group.clear_updaters()
        edges.clear_updaters()
        self.remove(nn_anim_group)

        # Hold for smooth looping
        self.wait(2)

        # Fade out all but particles for seamless loop
        self.play(*[FadeOut(m) for m in [axes, graph1, graph2, lines]],
                  run_time=1.5)
        self.wait(0.5)

